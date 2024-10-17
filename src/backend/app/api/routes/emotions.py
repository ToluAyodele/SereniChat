from fastapi import APIRouter

from core.db import mysql_cnx
from models import Emotions

router = APIRouter()

@router.post('/', response_model=list[str])
def get_emotion_synonyms(emotion: dict[str, str]) -> list[str]:
    """
    Retrieve synonyms for a given emotion.
    """
    emotion = emotion.get('sentiment')
    if mysql_cnx and mysql_cnx.is_connected():
        cursor = mysql_cnx.cursor()
        query = (
            """
              SELECT 
                e.synonym
              FROM emotions e
              WHERE e.word = %s
            """
        )
        cursor.execute(query, (emotion,))
        rows = cursor.fetchall()
        synonyms = [ row[0] for row in rows ]
        return synonyms
    return []
