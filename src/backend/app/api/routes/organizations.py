from fastapi import APIRouter
import mysql.connector
from typing import Any

from core.db import db_config
from models import Orgs

router = APIRouter()

# create a few api routes and see if we get the data back from the database
@router.get('/', response_model=list[dict[str, Any]])
def get_all_organizations() -> list[dict[str, Any]]:
    """
    Retrieve all organizations.
    """
    connection = mysql.connector.connect(**db_config)
    if connection and connection.is_connected():
        cursor = connection.cursor()
        query = (
            """
              SELECT 
                o.org_name, 
                o.org_logo, 
                o.org_description, 
                o.org_sub_description, 
                o.founding_year,
                l.city,
                l.state
              FROM orgs o
              JOIN locations l ON o.org_id = l.org_id
            """
        )
        cursor.execute(query)
        rows = cursor.fetchall()
        organizations = [ dict(zip(cursor.column_names, row)) for row in rows ]
        return organizations
    return []

@router.get('/sortedByName', response_model=list[dict[str, Any]])
def get_all_orgs_sorted_by_name() -> list[dict[str, Any]]:
    """
    Retrieve all organizations sorted by name.
    """
    connection = mysql.connector.connect(**db_config)
    if connection and connection.is_connected():
        cursor = connection.cursor()
        query = (
            """
              SELECT 
                o.org_name, 
                o.org_logo, 
                o.org_description, 
                o.org_sub_description, 
                o.founding_year,
                l.city,
                l.state
              FROM orgs o
              JOIN locations l ON o.org_id = l.org_id
              ORDER BY o.org_name
            """
            )
        cursor.execute(query)
        rows = cursor.fetchall()
        organizations = [ dict(zip(cursor.column_names, row)) for row in rows ]
        return organizations
    return []

@router.get('/sortedByFoundingYearAsc', response_model=list[dict[str, Any]])
def get_all_orgs_sorted_by_founding_year_ascending() -> list[dict[str, Any]]:
    """
    Retrieve all organizations sorted by founding year.
    """
    connection = mysql.connector.connect(**db_config)
    if connection and connection.is_connected():
        cursor = connection.cursor()
        query = (
            """
              SELECT 
                o.org_name, 
                o.org_logo, 
                o.org_description, 
                o.org_sub_description, 
                o.founding_year,
                l.city,
                l.state
              FROM orgs o
              JOIN locations l ON o.org_id = l.org_id
              ORDER BY o.founding_year ASC
            """
            )
        cursor.execute(query)
        rows = cursor.fetchall()
        organizations = [ dict(zip(cursor.column_names, row)) for row in rows ]
        return organizations
    return []

@router.get('/sortedByFoundingYearDesc', response_model=list[dict[str, Any]])
def get_all_orgs_sorted_by_founding_descending() -> list[dict[str, Any]]:
    """
    Retrieve all organizations sorted by founding year.
    """
    connection = mysql.connector.connect(**db_config)
    if connection and connection.is_connected():
        cursor = connection.cursor()
        query = (
            """
              SELECT 
                o.org_name, 
                o.org_logo, 
                o.org_description, 
                o.org_sub_description, 
                o.founding_year,
                l.city,
                l.state
              FROM orgs o
              JOIN locations l ON o.org_id = l.org_id
              ORDER BY o.founding_year DESC
            """
            )
        cursor.execute(query)
        rows = cursor.fetchall()
        organizations = [ dict(zip(cursor.column_names, row)) for row in rows ]
        return organizations
    return []