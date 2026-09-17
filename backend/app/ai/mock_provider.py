# Mock AI Provider for interpreting NL to constraints

def interpret_natural_language(text: str):
    # This acts as a mock to simulate LLM returning structured JSON.
    text_lower = text.lower()
    
    potential_memories = []
    constraints = []
    
    if "wake up" in text_lower and "6 am" in text_lower:
        potential_memories.append({
            "key": "wake_time",
            "value": "06:00",
            "memory_type": "preference",
            "source": "user"
        })
    
    if "exercise" in text_lower and "30 minutes" in text_lower:
        potential_memories.append({
            "key": "exercise_duration",
            "value": "30",
            "memory_type": "habit",
            "source": "user"
        })
        
    if "api development" in text_lower and "highest priority" in text_lower:
        constraints.append({
            "type": "priority",
            "subject": "API Development",
            "operator": "equals",
            "value": "Critical",
            "hardness": "hard",
            "source": "user"
        })
        
    if "testing must happen after development" in text_lower:
        constraints.append({
            "type": "dependency",
            "subject": "Testing",
            "operator": "starts_after",
            "value": "Development",
            "hardness": "hard",
            "source": "user"
        })

    return {
        "status": "success",
        "potential_memories": potential_memories,
        "inferred_constraints": constraints
    }
