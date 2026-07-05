from rest_framework import serializers
from .models import ChecklistResult
from .constants import VALID_CHECKLIST_ITEM_IDS


class ChecklistResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChecklistResult
        fields = ["id", "score", "tier", "checked_items", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_checked_items(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("checked_items must be a list")

        invalid_ids = [item for item in value if item not in VALID_CHECKLIST_ITEM_IDS]
        if invalid_ids:
            raise serializers.ValidationError(
                f"Unknown checklist item ID(s): {invalid_ids}"
            )

        return value