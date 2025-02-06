from typing import Any
from app.agents.base_agent import AgentOutput, BaseAgent
from gitingest import ingest
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
    
    def run(self, *args: Any, **kwargs: Any) -> CodeExtractorOutput:
        _ , tree, content = ingest(source="/c/Users/janit/desktop/RegReimagined/dtcch-2025-intellect-store/settlement_optimization",
                                        include_patterns=["Model.py", "DataModels.py", "README.md"])
        to_be_returned = tree + "\n\n" + content
        return CodeExtractorOutput(success=True, extracted_code=to_be_returned)


def main():
    agent = CodeExecutorAgent()
    result = agent.run()
    print(result.extracted_code)


if __name__ == "__main__":
    main()
