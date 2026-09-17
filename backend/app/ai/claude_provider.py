import os
import json
from anthropic import Anthropic

# Make sure to set ANTHROPIC_API_KEY in environment
client = Anthropic()

def interpret_with_claude(text: str):
    prompt = f"""
    You are an AI planning assistant. Extract scheduling constraints and persistent memories from the user's input.
    Output ONLY valid JSON matching this structure:
    {{
      "status": "success",
      "potential_memories": [
        {{"key": "wake_time", "value": "06:00", "memory_type": "preference", "source": "user"}}
      ],
      "inferred_constraints": [
        {{"type": "priority", "subject": "Task Name", "operator": "equals", "value": "Critical", "hardness": "hard", "source": "user"}}
      ]
    }}
    
    User Input: "{text}"
    """
    
    try:
        response = client.messages.create(
            model=os.getenv("CLAUDE_MODEL", "claude-3-haiku-20240307"),
            max_tokens=1000,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        # Parse the JSON from Claude's response
        content = response.content[0].text
        # Naive extraction if it wraps in markdown blocks
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
            
        return json.loads(content)
    except Exception as e:
        print(f"Claude API failed: {e}")
        # Fallback to empty if it fails
        return {
            "status": "error",
            "potential_memories": [],
            "inferred_constraints": []
        }
