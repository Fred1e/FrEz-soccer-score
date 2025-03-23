from fastapi import FastAPI
import requests

app = FastAPI()

API_KEY = "7b6507c792f74a2b9db41cfc8fd8cf05"
BASE_URL = "https://api.sportsdata.io/v4/soccer/scores/json/"

@app.get("/")
def home():
    return {"message": "Welcome to FrEz Soccer Score API"}

@app.get("/live-matches")
def live_matches():
    response = requests.get(f"{BASE_URL}Live?key={API_KEY}")
    return response.json() if response.status_code == 200 else {"error": "Failed to fetch live matches"}

@app.get("/daily-matches")
def daily_matches():
    response = requests.get(f"{BASE_URL}GamesByDate/2025-MAR-23?key={API_KEY}")
    return response.json() if response.status_code == 200 else {"error": "Failed to fetch daily matches"}

@app.get("/teams")
def teams():
    response = requests.get(f"{BASE_URL}Teams?key={API_KEY}")
    return response.json() if response.status_code == 200 else {"error": "Failed to fetch teams"}

@app.get("/players")
def players():
    response = requests.get(f"{BASE_URL}Players?key={API_KEY}")
    return response.json() if response.status_code == 200 else {"error": "Failed to fetch players"}
