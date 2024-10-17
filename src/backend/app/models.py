from sqlmodel import Field, Relationship, SQLModel

class Orgs(SQLModel, table=True):
    """
    Represents an organization entity.
    
    Attributes:
        org_id (int): The unique identifier for the organization.
        org_name (str): The name of the organization.
        org_logo (bytes): The logo of the organization.
        org_description (str): The description of the organization.
        org_sub_description (str, optional): The sub-description of the organization.
        founding_year (int): The founding year of the organization.
    """
    org_id: int = Field(default=None, primary_key=True)
    org_name: str = Field(max_length=255, unique=True)
    org_logo: bytes
    org_description: str
    org_sub_description: str | None = None
    founding_year: int

class Locations(SQLModel, table=True):
    """
    Represents a location entity.
    
    Attributes:
        location_id (int): The unique identifier for the location.
        city (str, optional): The city of the location.
        state (str): The state of the location.
        zip (str): The ZIP code of the location.
        org_id (int): The foreign key referencing the org_id in the Orgs table.
    """
    location_id: int = Field(default=None, primary_key=True)
    city: str | None = Field(default=None, max_length=100)
    state: str = Field(max_length=100)
    zip: str = Field(max_length=20)
    org_id: int = Field(foreign_key='orgs.org_id')

class Emotions(SQLModel, table=True):
    """
    Represents synonyms for a set amount of emotions.
    
    Attributes:
        emotion_id (int): The unique identifier for a synonym that matches to an emotion.
        word (str): The emotion.
        synonym (str): Synonym of a word.
    """
    emotion_id: int = Field(default=None, primary_key=True)
    word: str = Field(max_length=255, unique=True)
    synonym: str
