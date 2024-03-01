from django.shortcuts import render
from rest_framework.views import APIView
from .models import FileUpload
from .serializers import FileUploadSerializer
from django.core.files.storage import FileSystemStorage
import datetime
import pika
from rest_framework import permissions, serializers, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
import json 
from rest_framework.pagination import LimitOffsetPagination
from drf_yasg import openapi

class FileUploadListView(APIView, LimitOffsetPagination):
    permission_classes = [permissions.AllowAny]

    params = [
        openapi.Parameter(
            "limit", openapi.IN_QUERY, description="Limit", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            "offset", openapi.IN_QUERY, description="Offset", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            "upload_id",
            openapi.IN_QUERY,
            description="upload_id",
            type=openapi.TYPE_INTEGER,
        ),
    ]
      
    def get(self, request, *args, **kwargs):
        upload_id = request.query_params.get("upload_id")
        
        if(upload_id):
            rs = FileUpload.objects.filter(id=upload_id)
        else:
            rs = FileUpload.objects.all().order_by("-updated_at")
            
        qs = self.paginate_queryset(rs, request, view=self)
        result = FileUploadSerializer(qs, many=True)

        return self.get_paginated_response(result.data)

class FileUploadView(APIView):
   
    def patch(self, request, *args, **kwargs):
        upload_id = request.data["upload_id"]
        status_code = request.data["status"]
        

        try:
            rs = FileUpload.objects.filter(id=upload_id)
            rs.update(**{"status": status_code})
        except:
            raise
        else:
            return Response('File uploaded', status=status.HTTP_200_OK)

   
    def post(self, request, *args, **kwargs):
        try:
            now = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
            filename = request.data["file_name"]
            
            file_path = 'file_'+now+'.csv'
            folder='/django_files/' 
            file = request.FILES['file']
            fs = FileSystemStorage(location=folder)
            filename_to_save = fs.save(file_path, file)
            file_url = fs.url(filename_to_save)
            new_entry = FileUpload.objects.create(
                file_name = filename,
                file_path = folder+file_path,
            )
            
            message = {
                "file": folder+file_path,
                "id": new_entry.pk
            }
            
            self.put_in_queue(json.dumps(message))
            
            
            return Response('Tudo certo', status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        
    
    def put_in_queue(self, file_path):
        try:
            credentials = pika.PlainCredentials(username='user', password='123456')
            connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq', 5672, '/', credentials))
            channel = connection.channel()
            channel.basic_publish(exchange='file_to_process_queue', routing_key='file_to_process_queue', body=file_path)

        except Exception as e:
            
            raise
        finally:
            connection.close()






        