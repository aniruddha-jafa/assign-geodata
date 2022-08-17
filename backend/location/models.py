from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class LocationUpdate(models.Model):
    locationId = models.CharField(max_length=200) # geonames identifier
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField( auto_now_add=True)