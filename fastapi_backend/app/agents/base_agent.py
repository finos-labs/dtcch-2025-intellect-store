from abc import ABC, abstractmethod
from typing import Any, Tuple

class BaseAgent(ABC):
    @abstractmethod
    def run(self, *args: Any, **kwargs: Any) -> Tuple[bool, Any]:
        """
        Execute the agent's logic.

        Returns:
            Tuple[bool, Any]: A tuple containing a success flag and the result.
        """
        pass