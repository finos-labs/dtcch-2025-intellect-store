import boto3
import psycopg2
from langchain_aws import ChatBedrock
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

# PostgreSQL Configuration
DB_HOST = "dtcc-db.cnm0auo66hl0.us-west-2.rds.amazonaws.com"
DB_PORT = "5432"
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASSWORD = "hackathonadmin"

# Verify AWS credentials
sts_client = boto3.client("sts")
try:
    identity = sts_client.get_caller_identity()
    print("AWS Credentials are valid. Account ID:", identity["Account"])
except Exception as e:
    print("AWS Credentials are invalid. Error:", e)
    raise

# Initialize AWS Bedrock LLM
llm = ChatBedrock(
    model_id="anthropic.claude-3-5-sonnet-20241022-v2:0",
    region_name="us-west-2"
)

# Connect to PostgreSQL and retrieve stored embeddings
def fetch_stored_embeddings(pdf_name):
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT chunk, embedding FROM pdf_chunks WHERE pdf_name = %s ORDER BY id",
                    (pdf_name,)
                )
                data = cur.fetchall()
                return [(row[0], row[1]) for row in data]
    except Exception as e:
        print(f"Error fetching embeddings from PostgreSQL: {e}")
        return []

# Retrieve stored embeddings for PDFs
pdf1_chunks = fetch_stored_embeddings("pdf1")
pdf2_chunks = fetch_stored_embeddings("pdf2")

if not pdf1_chunks or not pdf2_chunks:
    print("Error: No embeddings found for one or both PDFs.")
    exit()

# Define a prompt template for comparing documents
prompt_template = PromptTemplate(
    input_variables=["text1", "text2"],
    template="""
    You are a regulatory compliance expert. Compare the following two documents and provide a detailed summary of the prominent changes that could affect a business. Focus on high-level changes, not minor details.

    Document 1:
    {text1}

    Document 2:
    {text2}

    Summary of Changes:
    """
)

# Create an LLM chain
llm_chain = LLMChain(llm=llm, prompt=prompt_template)

# Open a text file to save the output
output_file = "document_changes_summary.txt"
with open(output_file, "w") as file:
    # Compare each pair of text chunks
    for i, ((text1, embedding1), (text2, embedding2)) in enumerate(zip(pdf1_chunks, pdf2_chunks)):
        response = llm_chain.run(text1=text1, text2=text2)
        
        # Write the response to the file
        file.write(f"Changes in chunk {i+1}:\n{response}\n\n")
        print(f"Changes in chunk {i+1} saved to {output_file}")

print(f"All changes have been saved to {output_file}")