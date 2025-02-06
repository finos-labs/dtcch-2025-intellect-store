from typing import Any, Tuple
from app.agents.base_agent import BaseAgent

class CodeInspectorAgent(BaseAgent):
    def run(self, *args: Any, **kwargs: Any) -> Tuple[bool, Any]:
        return True, "Hello World"