from fastapi import APIRouter
import random

router = APIRouter()

with open("horse_facts.txt") as f:
    facts = f.readlines()


@router.get("/random")
async def get_random_fact():
    random_fact = random.choice(facts)
    return {"data": random_fact}
