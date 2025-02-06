from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Tuple

@dataclass
class AgentOutput:
    """
    Base class for agent outputs.
    
    Attributes:
        success (bool): Indicates whether the operation was successful.
    """
    success: bool

class BaseAgent(ABC):
    @abstractmethod
    def run(self, *args: Any, **kwargs: Any) -> AgentOutput:
        """
        Execute the agent's logic.

        Returns:
            Tuple[bool, Any]: A tuple containing a success flag and the result.
        """
        pass