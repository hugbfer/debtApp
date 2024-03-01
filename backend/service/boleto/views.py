from django.shortcuts import render
from django.conf import settings
from pymongo import MongoClient
from bson import json_util
import smtplib
from email.message import EmailMessage

import json

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

def get_mongo_connection(db):
    client = MongoClient(settings.MONGODB_URL)
    db = client[db]
    return client, db

class GetUsersDebts(APIView):
    
    permission_classes = [permissions.AllowAny]  

    def get(self, request, format=None):
        try:
            email = request.query_params.get('email')
            governmentId = request.query_params.get('governmentId')
            upload_id = request.query_params.get('upload_id')
            client, db = get_mongo_connection('clients')
            collection = db['clients']
            
            
            page = request.query_params.get('page')
            rows = request.query_params.get('rows')
            if not page:
                page = '0'
            
            if not rows:
                rows = '10'
                
            page = int(page)
            rows = int(rows)
                    
            filters = {}
                    
            if email:
                filters ["email"] = {"$eq": email}
            
            if governmentId:
                filters["governmentId"] = { "$eq": int(governmentId) } 
            
            if upload_id:
                filters["upload_id"] = {"$eq": int(upload_id)} 
                
            
            if not filters:
                return Response('Por favor, informe o email, governmentId ou o upload_id para fazer a busca', status=400) 
            
        
            rs = collection.find(filters).sort([("debtDueDate")]).skip(rows * page).limit(rows)
            result = json.loads(json_util.dumps(rs))
            count = collection.count_documents(filters, skip = rows * page)
            has_next = count / rows - (page + 1) > 0
            has_previous = page > 0
            pagination = {'count': count, 'next': has_next, 'previous': has_previous, 'page': page, 'rows': rows}
            
            response = {'pagination': pagination, 'data': result}
            return Response(response)

        except Exception as e:
            
            raise
        finally:
            client.close()


class SendMail(APIView):
    
    permission_classes = [permissions.AllowAny]  

    def get(self, request, format=None):

        try:
            email = request.query_params.get('email')
            smtpserver = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            smtpserver.ehlo()
            smtpserver.login(settings.SMTP_MAIL, settings.SMTP_PASSWORD)

            # Test send mail
            sent_from = settings.SMTP_MAIL
            sent_to = 'hugof508@gmail.com'  #  Send it to self (as test)
            message = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Download do Boleto</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        a {
            display: inline-block;
            font-size: 16px;
            padding: 10px 20px;
            text-decoration: none;
            background-color: #3498db;
            color: #fff;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

        a:hover {
            background-color: #2980b9;
        }
        
        a[href]
        {
            color: #fff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Olá,</h2>
        <p>Você pode baixar o boleto clicando no botão abaixo:</p>
        <p><a href="http://localhost/boleto" target="_blank">Acessar boleto</a></p>
    </div>
</body>
</html>"""
            email = EmailMessage()
            email["From"] = sent_from
            email["To"] = email
            email["Subject"] = "Faça o download do seu boleto"
            email.set_content(message, subtype="html")
            smtpserver.sendmail(sent_from, sent_to, email.as_string())
            return Response('Sent', 200)
            # Close the connection
        except Exception as e:
            raise
        finally:
            smtpserver.close()
