from django.urls import path
from .views import GeneratePasswordView

urlpatterns = [
    path('generate-password/', GeneratePasswordView.as_view(), name='generate-password'),
]