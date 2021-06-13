from django.db import models
from django.contrib.auth.models import User


class ScoreInformation(models.Model):
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    score = models.IntegerField(default=500)
    boost = models.IntegerField(default=1)
    score_hit = models.IntegerField(default=1)
    lvl = models.IntegerField(default=1)
    nextLvl_hit = models.IntegerField(default=25)
    nextLvl_click = models.IntegerField(default=25)


