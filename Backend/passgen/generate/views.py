# generate/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import GeneratedPassword
from .serializers import GeneratedPasswordSerializer
from django.utils.crypto import get_random_string

class GeneratePasswordView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        lower_case = request.data.get('lowerCase', False)
        upper_case = request.data.get('upperCase', False)
        numbers = request.data.get('numbers', False)
        symbols = request.data.get('symbols', False)
        password_length = int(request.data.get('passwordLength', 4))

        character_set = ''
        if lower_case:
            character_set += 'abcdefghijklmnopqrstuvwxyz'
        if upper_case:
            character_set += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if numbers:
            character_set += '0123456789'
        if symbols:
            character_set += '!@#$%^&*()_+[]{}|;:,.<>?'

        if not character_set:
            return Response({'error': 'Select at least one character set for password generation.'}, status=status.HTTP_400_BAD_REQUEST)

        generated_password = get_random_string(password_length, character_set)

        password_instance = GeneratedPassword(password=generated_password)
        password_instance.save()

        serializer = GeneratedPasswordSerializer(data={'password': generated_password})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

