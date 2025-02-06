from typing import Any, Tuple
from agents.base_agent import AgentOutput, BaseAgent
from app.agents.regulation_inspector.agent import RegulationInspectorOutput
from app.agents.code_extractor.agent import CodeExtractorOutput, CodeExecutorAgent
from langchain_aws import ChatBedrock
from langchain_core.messages import SystemMessage, HumanMessage,AIMessage,ToolMessage
from dataclasses import dataclass
from langchain_core.tools import tool
import os

@tool
def update_optimization_model(function_name: str, function_definition: str, change_explanation) -> str:
    """
    Updates the optimization model with a new function definition and provides an explanation for the change.
Args:
    function_name (str): The name of the function to be updated or created.
    function_definition (str): The new definition of the function including the entire function code.
    change_explanation: An explanation of the changes made to the function.
Returns:
    str: A message indicating the result of the update operation.
    """
    return f"Function {function_name} updated with definition {function_definition}"



@dataclass
class CodeInspectorOutput(AgentOutput):
    """
    A container for storing the results of the code inspection.

    Attributes:
        suggestions (List[str]): A list of suggested improvements for the code.
        summary_of_changes (str): A summary of the changes made based on the inspection.
    """
    suggestions: Any


class CodeInspectorAgent(BaseAgent):
    '''
    Compares the findings of the *Regulation Inspector* with the extracted code from the *Code Extractor*, 
    determining whether a code adaptation is required.  If adaptation is necessary, it synthesizes the regulatory changes,
    extracted code, and code explanation from the *Code Extractor*, creating a plan for code adaptation. 
    '''
    def run(self, regulation_inspector_output: RegulationInspectorOutput, code_extractor_output: CodeExtractorOutput, **kwargs: Any) -> CodeInspectorOutput:
        llm = ChatBedrock(
        model_id="anthropic.claude-3-5-sonnet-20241022-v2:0",
        region_name="us-west-2"
        )
        
        repo_data = code_extractor_output.extracted_code
        suggestions = []
        regulatory_data = regulation_inspector_output.summary_of_changes
        prompt = f"""

You are an expert in optimization modeling using google-or-tools in python. You are also an expert in the financial industry, more specifically in the settlement optimization.

# Main Task:
- Your main task is to adapt an optimization model to solve a settlement optimization problem.

This is the repository data that contains the code extracted from the repository, the README file is super important for you to understand the context of the code:
<Start of Repository Data>
{repo_data}
<End of Repository Data>

# Steps to take when user asks for an update to the optimization problem:
- The user will ask for an update to the optimization model.
- Your main task is to adapt an optimization model.
- You are only allowed to change blocks of the code at once. The code is divided into different functions so you either:
  - Add a new function to the code.
  - Modify an existing function.
  - Remove a function.
  
# Showing adaptation to the user:
 - You will tell the user which function or class you are going to modify or add.
 - You show the updated or new function or class to the user.
 - You explain the changes you made and why you made them.
 
# Final remark:
- You must always use the tool provided, named "update_optimization_model", to update the optimization model.
- if there are no more changes to be made, you can end the conversation by saying "No more changes needed".
"""

        system_message = SystemMessage(prompt)
        human_message = HumanMessage(content="Please adapt the optimization model to solve the following problem: " + RegulationInspectorOutput)
        messages = [system_message, human_message]
        response = llm.invoke(input = messages)
        if isinstance(response, AIMessage):
            while response.tool_calls:
                tool_call = response.tool_calls[0]
                suggestions.append(tool_call["args"])
                messages.append(response)
                messages.append(ToolMessage(content="Change has been added, please add more changes or say 'No more changes needed'", tool_call_id=tool_call["id"]))
                response = llm.invoke(input = messages)
                
                
        return CodeInspectorOutput(success=True, suggestions=suggestions)
    

def main():
    code_extraction_agent = CodeExecutorAgent()
    code_extraction_output = code_extraction_agent.run()
    regulation_inspector_output = RegulationInspectorOutput(success=True, summary_of_changes="Hello World")
    agent = CodeInspectorAgent()
    result = agent.run(regulation_inspector_output=regulation_inspector_output, code_extractor_output=code_extraction_output)
    for suggestion in result.suggestions:
        print( "_____suggestion______")
        print("Function Name: ", suggestion["function_name"])
        print("Function Definition:")
        print(suggestion["function_definition"])
        print("Change Explanation:")
        print(suggestion["change_explanation"])
        print("____________________")


if __name__ == "__main__":
    main()