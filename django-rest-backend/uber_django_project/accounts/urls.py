from django.conf.urls import url
from . import views


print('accounts.urls')
urlpatterns = [
    url(r'^account/create/$', views.UserCreate.as_view(), name='account-create'),
    url(r'^account/current-user/$', views.CurrentUserView.as_view(), name='current-user'),
]
