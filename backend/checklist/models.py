from django.db import models
import uuid


class ChecklistResult(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    score = models.IntegerField()
    tier = models.CharField(max_length=20)
    checked_items = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.score}% ({self.tier})"
