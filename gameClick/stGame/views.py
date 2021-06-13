from django.http import HttpResponse, JsonResponse
from . import models
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib import auth
import json

# Create your views here.

@login_required
def home(request):
    score = models.ScoreInformation.objects.get(user=request.user)
    return render(request, 'stGame/home.html', {'score': score})


def login(request):
    if request.method == 'POST':
        user_name = request.POST['login']
        password = request.POST['password']
        user = auth.authenticate(username=user_name, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)
            return redirect('home')
    return render(request, 'stGame/login.html')


def logout(request):
    auth.logout(request)
    return redirect('home')


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            score_information = models.ScoreInformation()
            score_information.user = user
            score_information.save()


            return redirect('login')
        else:
            return render(request, 'stGame/sign.html', {'form': form})

    form = UserCreationForm()
    return render(request, 'stGame/sign.html', {'form': form})


def updata(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            user = models.ScoreInformation.objects.get(user=request.user)
            data = json.load(request)
            user.score = data['c_score']
            user.boost = data['c_power']
            user.score_hit = data['c_hit']
            user.lvl = data['c_lvl']
            user.nextLvl_hit = data['c_hit_up_cost']
            user.nextLvl_click = data['c_power_up_cost']
            user.save()
            return JsonResponse(data=data)
