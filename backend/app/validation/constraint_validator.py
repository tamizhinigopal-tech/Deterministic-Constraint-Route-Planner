from app.schemas.schemas import DynamicConstraint
from typing import List

def validate_constraints(constraints: List[dict]) -> List[DynamicConstraint]:
    """
    Validates dynamic constraints using Pydantic.
    """
    validated = []
    for c in constraints:
        # This will raise ValidationError if invalid
        validated_constraint = DynamicConstraint(**c)
        validated.append(validated_constraint)
    return validated
