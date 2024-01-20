#!/bin/bash

# Navigate to the backend directory
cd backend

# Activate the virtual environment
source venv/bin/activate

# Start the Uvicorn server with the specified application and enable the reload option
uvicorn routes.main:app --reload
