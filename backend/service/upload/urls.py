from django.urls import path

from . import views

urlpatterns = [
   path(
        "file-upload/",
        views.FileUploadView.as_view(),
        name="file-upload",
    ),
   path(
       "file-upload-list/",
       views.FileUploadListView.as_view(),
       name="file-upload-list"
   )
]