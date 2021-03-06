# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from rest_framework.permissions import IsAuthenticated

# Create your views here.



from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from uber_app.serializers import UserSerializer, GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.

    """

    permission_classes = (IsAuthenticated, )
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    permission_classes = (IsAuthenticated, )
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
