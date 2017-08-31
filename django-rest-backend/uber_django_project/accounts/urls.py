from django.conf.urls import url
from . import views


print('accounts.urls')
urlpatterns = [
    url(r'^$', views.UserCreate.as_view(), name='account-create'),
]
