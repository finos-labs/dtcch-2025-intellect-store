from typing import Any, Tuple
from app.agents.base_agent import BaseAgent


class CodeExecutorAgent(BaseAgent):
    '''Retrieves source code from Git repositories using gitingest.'''
    #use environment variables for connecting to the database
    def run(self, *args: Any, **kwargs: Any) -> Tuple[bool, Any]:
        return True, "Hello World"