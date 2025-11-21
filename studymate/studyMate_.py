# from openai import OpenAI
# from dotenv import load_dotenv
# import os
# from behaviors.behavior_Obj import behavior
# from flask import flash, jsonify, render_template
# from flask_cors import CORS

# from behaviors.English import English_Support
# from behaviors.Zulu import Zulu_Support
# from behaviors.xhosa import xhosa_Support
# load_dotenv()

# # Get API key from environment
# api_key = os.getenv("OPENAI_API_KEY")
# OpenAI.api_key = api_key

# client = OpenAI()

# #taking the name of the user and language to assign agent
# Name = input("what is your name? ")
# language = input("Which language do you speak? ")

# if language == "english":
#     prompt_agent = behavior(
#         #name variable should be a user name not system
#         #NB NEEDS URGENT ATTENTION
#     name=English_Support.name,
#     instruction=English_Support.instruction
#     )

# if language == "xhosa":
#     prompt_agent = behavior(
#     name=xhosa_Support.name,
#     instruction=xhosa_Support.instruction
# )

# if language == "zulu":
#     prompt_agent = behavior(
#         name=Zulu_Support.name,
#         instruction=Zulu_Support.instruction
#     )


# conversation_history = []

# while True:
#     user_input = input("You: ").strip()

#     if user_input.lower() == "quit":
#         print("Exiting chat. Goodbye!")
#         break

#     # Add user's message to history
#     conversation_history.append({"role": "user", "content": user_input})

#     # Build prompt string for OpenAI
#     prompt = prompt_agent.name + "\n"+ prompt_agent.instruction + "\n"
#     for msg in conversation_history:
#         prompt += f"{msg['role'].capitalize()}: {msg['content']}\n"

#     # Call OpenAI Responses API
#     response = client.responses.create(
#         model="gpt-4.1-mini",
#         input=prompt,
#         temperature=0.3
#     )

#     # Get assistant's reply
#     agent_message = response.output_text.strip()

#     # Print reply with agent's name
#     print(f"{prompt_agent.name}: {agent_message}")

#     # Add assistant's reply to conversation history
#     conversation_history.append({"role": "assistant", "content": agent_message})

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os

from behaviors.behavior_Obj import behavior
from behaviors.English import English_Support
from behaviors.Zulu import Zulu_Support
from behaviors.xhosa import xhosa_Support

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("OPENAI_API_KEY is not set in your environment")

client = OpenAI(api_key=api_key)

app = Flask(__name__)
# Allow requests from your React (Vite) dev server
CORS(app, origins=["http://localhost:5173"])

def get_prompt_agent(language: str):
    """Pick the right behavior based on language."""
    lang = (language or "").strip().lower()

    if lang == "zulu":
        return behavior(
            name=Zulu_Support.name,
            instruction=Zulu_Support.instruction
        )
    if lang == "xhosa":
        return behavior(
            name=xhosa_Support.name,
            instruction=xhosa_Support.instruction
        )
    # default to English
    return behavior(
        name=English_Support.name,
        instruction=English_Support.instruction
    )

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(force=True)

    messages = data.get("messages", [])
    language = data.get("language", "english")
    difficulty = data.get("difficulty", "medium")
    user_name = data.get("userName", "Student")

    # Pick behavior for this language
    prompt_agent = get_prompt_agent(language)

    # Build conversation history string
    conversation_history = []
    for msg in messages:
        role = msg.get("role")
        content = msg.get("content", "")
        if role in ("user", "assistant"):
            conversation_history.append({"role": role, "content": content})

    # Add user context to personalize responses
    user_context = f"\n\nUser Context:\n"
    user_context += f"- Student Name: {user_name}\n"
    user_context += f"- Difficulty Level: {difficulty}\n\n"

    # Add difficulty-specific instructions
    if difficulty == "easy":
        user_context += "Instructions: Use simple language, break down concepts step-by-step, and provide plenty of examples. Avoid complex terminology.\n"
    elif difficulty == "hard":
        user_context += "Instructions: Use advanced terminology, provide in-depth explanations, challenge with complex concepts, and expect higher understanding.\n"
    else:  # medium (default)
        user_context += "Instructions: Use clear explanations with moderate detail, relevant examples, and balanced complexity.\n"

    user_context += f"Address the student as {user_name} when appropriate.\n\n"

    prompt = prompt_agent.name + "\n" + prompt_agent.instruction + user_context
    for msg in conversation_history:
        prompt += f"{msg['role'].capitalize()}: {msg['content']}\n"

    try:
        response = client.responses.create(
            model="gpt-4.1-mini",
            input=prompt,
            temperature=0.3
        )

        # Using the helper that was in your original code
        assistant_reply = response.output_text.strip()

        # Return JSON to frontend
        return jsonify({"reply": assistant_reply})
    except Exception as e:
        print("Error from OpenAI:", e)
        return jsonify({"error": "Error talking to AI"}), 500

if __name__ == "__main__":
    # Run Flask dev server
    app.run(host="0.0.0.0", port=5000, debug=True)

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
