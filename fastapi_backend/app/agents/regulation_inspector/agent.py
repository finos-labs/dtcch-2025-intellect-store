from typing import Any, Tuple, List
from app.agents.base_agent import AgentOutput, BaseAgent
from dataclasses import dataclass
from typing import List

@dataclass
class CodeInspectorOutput(AgentOutput):
    """
    A simple container for storing code inspection output.
    
    Attributes:
        issues (List[str]): A list of identified issues in the inspected code.
        suggestions (List[str]): A list of suggested improvements for the code.
    """
    summary_of_changes: str

class RegulationInspectorAgent(BaseAgent):
    '''
    Analyzes and extracts detailed differences between old and new regulatory documents.  
    '''
    #use environment variables for connecting to the database
    def run(self, *args: Any, **kwargs: Any) -> CodeInspectorOutput:
        return CodeInspectorOutput(success=True, summary_of_changes="Hello World")