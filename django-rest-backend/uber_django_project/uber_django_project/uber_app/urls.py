from django.conf.urls import url
from .views import UserSerializer, GroupSerializer


print('uber_app.urls')
urlpatterns = [
    url(r'^$', UserSerializer.as_view(), name='account-create'),
    url(r'^current-user/$', GroupSerializer.as_view(), name='account-current-user'),
]