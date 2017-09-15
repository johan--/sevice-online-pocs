from django.conf.urls import url
from .views import UserCreate, CurrentUserView


print('accounts.urls')
urlpatterns = [
    url(r'^$', UserCreate.as_view(), name='account-create'),
    url(r'^current-user/$', CurrentUserView.as_view(), name='account-current-user'),
]
