from django.urls import path
from .views import *


urlpatterns = [
    path('', home, name="home"),
    path('accounts/login/', login, name="login"),
    path('register/', register, name="register"),
    path('logout/', logout, name="logout"),
    path('updata', updata, name="updata"),
]