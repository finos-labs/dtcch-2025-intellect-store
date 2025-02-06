from typing import Any, Tuple
from uuid import UUID
from app.agents.base_agent import AgentOutput, BaseAgent

from dataclasses import dataclass

@dataclass
class CodeExtractorOutput(AgentOutput):
    """
    A container for storing the results of the code extraction.

    Attributes:
        extracted_code (str): The source code that was extracted from the repository.
    """
    extracted_code: str


class CodeExecutorAgent(BaseAgent):
    '''Retrieves source code from Git repositories using gitingest.'''
    #use environment variables for connecting to the database
    def run(self, repository_id: UUID, **kwargs: Any) -> CodeExtractorOutput:
        return CodeExtractorOutput(success=True, extracted_code="Hello World")