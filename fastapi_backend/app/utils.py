import boto3
import os
from langchain_aws import ChatBedrock
from fastapi.routing import APIRoute

llm_temperature = 0.7

def simple_generate_unique_route_id(route: APIRoute):
    return f"{route.tags[0]}-{route.name}"

def get_llm_client(llm_temperature: float = 0.1):
    bedrock_runtime = boto3.client(
        service_name='bedrock-runtime',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_REGION'),
    )

    return ChatBedrock(
        client=bedrock_runtime,
        model_id='anthropic.claude-3-sonnet-20240229-v1:0',
        model_kwargs=dict(temperature=llm_temperature),
    )