from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class FileUpload(models.Model):
    STATUS_CHOICES = (
    ('U', "Uploaded"),
    ('Q', "Queued"),
    ('P', "Processing"),
    ('F', "Finished"),
    ('E', "Error"),
)
    file_name = models.CharField(max_length=200)
    file_path = models.CharField(max_length=200)
    status = models.CharField(max_length=1,
                  choices=STATUS_CHOICES,
                  default='U')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)