from rest_framework import serializers
from .models import GeneratedPassword

class GeneratedPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model=GeneratedPassword
        fields = ['password']

        