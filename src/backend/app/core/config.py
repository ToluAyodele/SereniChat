from dotenv import load_dotenv
from typing import Any

from pydantic import (
    AnyHttpUrl, 
    field_validator
)
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    """
    Settings class for managing configuration variables.

    Args:
        API_V1_STR (str): The base path for API version 1.
        MYSQL_SERVER (str): MySQL server address.
        MYSQL_USER (str): MySQL username.
        MYSQL_PASSWORD (str): MySQL password.
        MYSQL_DB (str): MySQL database name.
        MYSQL_DATABASE_URI (MySqlDsn | None): MySQL database connection URI. Defaults to None.
    """

    API_V1_STR: str = '/api/v1'

    CORS_ORIGINS: list[AnyHttpUrl] | str = []

    MYSQL_SERVER: str
    MYSQL_USER: str
    MYSQL_PASSWORD: str
    MYSQL_DB: str

    @field_validator('CORS_ORIGINS', mode='before')
    @classmethod
    def assemble_cors_origins(cls, v: str | list[str]) -> list[str] | str:
        if isinstance(v, str) and not v.startswith('['):
            return [ i.strip() for i in v.split(',') ]
        elif isinstance(v, list | str):
            return v
        raise ValueError(v)

settings = Settings()
