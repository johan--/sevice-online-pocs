from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User
from ..permissions import PublicEndpoint
from rest_framework.renderers import JSONRenderer
from rest_framework import serializers


class UserCreate(APIView):
    """
    Creates the user.
    """
    permission_classes = (PublicEndpoint,)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        print('post -> data', request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(APIView):
    permission_classes = (PublicEndpoint,)
    print('/home/etallaou/dev/sevice-online-pocs/django-rest-backend/uber_django_project/accounts/views/user_manage.py')

    def get(self, request, format='json'):
        if request.user.is_authenticated():
            current_user = serializers.SerializerMethodField('_user')
            user = UserSerializer(request.user)

            content = {
                'apiUrl': '/api/v1',  # `django.contrib.auth.User` instance.
                'user': user.data,
                'loggedIn': True,
                'properties': {
                    'loginEndpoint': '/api/v1/authentication/login'
                }

            }
            print('content', content)
            return Response(content)
        content = {
            'apiUrl': '/api/v1',
            'loggedIn': False,
            'properties': {
                'loginEndpoint': '/api/v1/authentication/login'
            }
        }
        return Response(content)
