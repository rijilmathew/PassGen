from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    first_name=models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email=models.EmailField(max_length=50,unique=True)
    is_service_provider = models.BooleanField(default=False)
    mobile_number = models.IntegerField(null=True, blank=True)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['mobile_number','username']


    def __str__(self):
        return self.username
