from openai import OpenAI
from dotenv import load_dotenv
import os
from behaviors.behavior_Obj import behavior
from flask import flash, jsonify, render_template
from flask_cors import CORS

from behaviors.English import English_Support
from behaviors.Zulu import Zulu_Support
from behaviors.xhosa import xhosa_Support
load_dotenv()

# Get API key from environment
api_key = os.getenv("OPENAI_API_KEY")
OpenAI.api_key = api_key

client = OpenAI()

#taking the name of the user and language to assign agent
Name = input("what is your name? ")
language = input("Which language do you speak? ")

if language == "english":
    prompt_agent = behavior(
        #name variable should be a user name not system
        #NB NEEDS URGENT ATTENTION
    name=English_Support.name,
    instruction=English_Support.instruction
    )

if language == "xhosa":
    prompt_agent = behavior(
    name=xhosa_Support.name,
    instruction=xhosa_Support.instruction
)

if language == "zulu":
    prompt_agent = behavior(
        name=Zulu_Support.name,
        instruction=Zulu_Support.instruction
    )


conversation_history = []

while True:
    user_input = input("You: ").strip()

    if user_input.lower() == "quit":
        print("Exiting chat. Goodbye!")
        break

    # Add user's message to history
    conversation_history.append({"role": "user", "content": user_input})

    # Build prompt string for OpenAI
    prompt = prompt_agent.name + "\n"+ prompt_agent.instruction + "\n"
    for msg in conversation_history:
        prompt += f"{msg['role'].capitalize()}: {msg['content']}\n"

    # Call OpenAI Responses API
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt,
        temperature=0.3
    )

    # Get assistant's reply
    agent_message = response.output_text.strip()

    # Print reply with agent's name
    print(f"{prompt_agent.name}: {agent_message}")

    # Add assistant's reply to conversation history
    conversation_history.append({"role": "assistant", "content": agent_message})

#test the apikey
#print("api key : ", api_key)

# English_agent = behavior(
#     name=English_Support.name,
#     instruction=English_Support.instruction
# )

# zulu_agent = behavior(
#     name=Zulu_Support.name,
#     instruction=Zulu_Support.instruction
# )
# conversation_history = []

# while True:
#     user_input = input("You: ").strip()

#     if user_input.lower() == "quit":
#         print("Exiting chat. Goodbye!")
#         break

#     #Add message to conversation history
#     conversation_history.append({"role": "user", "content": user_input})

#     #build message for open ai
#     messages = [
#         {"role": "system", "content": English_agent.instruction},
#         *conversation_history]

#     #call openai response completion ai
#     response = client.responses.create(
#         model = "gpt-5",
#         input= messages,
#         temperature = 0.5
#     )

#     #agent_message = response.choices[0].message.content.strip()
#     agent_message = response.output_text.strip()  # for new API
#     print(f"{'English_agent.name'}: {agent_message}")

#     #add agent's reply to conversation
#     conversation_history.append({"role": "assistant", "content": agent_message})


# try:

#     response = OpenAI.responses.create(
#         model="gpt-5",
#         input= "Hello! Can you test my API key?"
#     )
#     print("API Key Test Successful! Response:")
#     print(response.output_text)

# except Exception as e:
#     print("API Key Test Failed!")
#     print(e)
