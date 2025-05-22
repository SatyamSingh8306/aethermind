import os
import asyncio
import logging
import traceback
from typing import Dict, Any
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain.schema import HumanMessage, SystemMessage
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import ConversationChain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import uvicorn

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="AetherMind Chatbot", description="Intelligent chatbot for AetherMind", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "llama-3.1-70b-versatile")
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.7"))
MAX_TOKENS = int(os.getenv("MAX_TOKENS", "1024"))

logger.info(f"Starting with MODEL_NAME: {MODEL_NAME}")
logger.info(f"GROQ_API_KEY present: {'Yes' if GROQ_API_KEY else 'No'}")

if not GROQ_API_KEY:
    logger.error("GROQ_API_KEY environment variable is required")
    raise ValueError("GROQ_API_KEY environment variable is required")

# Initialize Groq LLM with error handling
try:
    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY,
        model_name=MODEL_NAME,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS
    )
    logger.info("Successfully initialized Groq LLM")
except Exception as e:
    logger.error(f"Failed to initialize Groq LLM: {str(e)}")
    raise

# AetherMind company prompt
AETHERMIND_PROMPT = """You are an AI assistant for AetherMind, a cutting-edge technology company specializing in artificial intelligence and machine learning solutions. Here's what you need to know about AetherMind:

## About AetherMind:
- **Mission**: To democratize AI and make intelligent solutions accessible to businesses of all sizes
- **Vision**: Creating a future where AI seamlessly integrates with human creativity and productivity
- **Core Values**: Innovation, Transparency, Ethical AI, User-Centric Design

## Our Services:
1. **AI Consulting**: Strategic guidance for AI implementation and digital transformation
2. **Custom AI Solutions**: Tailored machine learning models and AI applications
3. **AI Training & Education**: Workshops, courses, and certification programs
4. **AI Ethics & Governance**: Responsible AI practices and compliance solutions

## Key Technologies:
- Machine Learning & Deep Learning
- Natural Language Processing
- Computer Vision
- Conversational AI & Chatbots
- Predictive Analytics
- AI-Powered Automation

## Target Industries:
- Healthcare & Medical Technology
- Finance & Fintech
- E-commerce & Retail
- Manufacturing & Supply Chain
- Education & EdTech
- Government & Public Sector

## Company Culture:
- Innovation-driven with a focus on breakthrough technologies
- Collaborative and inclusive work environment
- Continuous learning and professional development
- Strong emphasis on ethical AI practices
- Customer success is our priority

## Tone & Communication Style:
- Professional yet approachable
- Technical expertise balanced with clear explanations
- Enthusiastic about AI possibilities
- Honest about limitations and challenges
- Solution-oriented mindset

When responding to queries:
1. Always maintain a helpful and professional tone
2. Provide accurate information about AetherMind's capabilities
3. If you don't know specific details, acknowledge it and offer to connect them with the appropriate team
4. Focus on how AetherMind can solve their specific problems
5. Encourage further engagement and consultation

Current conversation:
{history}
Human: {input}
Assistant:"""

# Create prompt template
prompt_template = PromptTemplate(
    input_variables=["history", "input"],
    template=AETHERMIND_PROMPT
)

# Memory for conversation history
memory = ConversationBufferWindowMemory(k=10, return_messages=True)

# Create conversation chain
conversation_chain = ConversationChain(
    llm=llm,
    prompt=prompt_template,
    memory=memory,
    verbose=False
)

# Request/Response models
class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"

class ChatResponse(BaseModel):
    response: str
    session_id: str

# Store for multiple sessions
conversation_sessions: Dict[str, ConversationChain] = {}

def get_or_create_session(session_id: str) -> ConversationChain:
    """Get existing session or create new one"""
    if session_id not in conversation_sessions:
        session_memory = ConversationBufferWindowMemory(k=10, return_messages=True)
        conversation_sessions[session_id] = ConversationChain(
            llm=llm,
            prompt=prompt_template,
            memory=session_memory,
            verbose=False
        )
    return conversation_sessions[session_id]

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "AetherMind Chatbot API is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "model": MODEL_NAME,
        "temperature": TEMPERATURE,
        "max_tokens": MAX_TOKENS,
        "active_sessions": len(conversation_sessions)
    }

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Main chat endpoint"""
    try:
        logger.info(f"Received chat request: {request.message[:50]}... (session: {request.session_id})")
        
        # Get or create conversation session
        session_chain = get_or_create_session(request.session_id)
        logger.info(f"Using session: {request.session_id}")
        
        # Get response from the conversation chain
        logger.info("Calling Groq API...")
        response = await asyncio.to_thread(
            session_chain.predict,
            input=request.message
        )
        logger.info(f"Got response: {response[:100]}...")
        
        return ChatResponse(
            response=response,
            session_id=request.session_id
        )
    
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")

@app.delete("/chat/session/{session_id}")
async def clear_session(session_id: str):
    """Clear a specific chat session"""
    if session_id in conversation_sessions:
        del conversation_sessions[session_id]
        return {"message": f"Session {session_id} cleared successfully"}
    return {"message": f"Session {session_id} not found"}

@app.delete("/chat/sessions")
async def clear_all_sessions():
    """Clear all chat sessions"""
    conversation_sessions.clear()
    return {"message": "All sessions cleared successfully"}

@app.get("/chat/sessions")
async def get_active_sessions():
    """Get list of active sessions"""
    return {
        "active_sessions": list(conversation_sessions.keys()),
        "total_sessions": len(conversation_sessions)
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "8000")),
        reload=True
    )