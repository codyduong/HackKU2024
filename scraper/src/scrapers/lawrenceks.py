import os
import requests
import json
from datetime import datetime, timedelta, timezone
from urllib.parse import urlencode
from pymongo import MongoClient, UpdateOne

def __get_token() -> str:
    # Assuming the token endpoint returns a JSON with the token under 'token' key
    response = requests.get('https://www.explorelawrence.com/plugins/core/get_simple_token/')
    response.raise_for_status()  # Raises an HTTPError for bad requests
    return response.text.strip()

def __build_url(token: str, start_date: datetime, end_date: datetime) -> str:
    base_url = 'https://www.explorelawrence.com/includes/rest_v2/plugins_events_events_by_date/find/?'

    # Format start and end dates to start of the day (midnight), because server doesn't handle specific times
    # it also requires it be midnight in client's timezone, this is CST (T05) LOL! this will never be problematic!!!
    start_date_str = start_date.strftime("%Y-%m-%dT05:00:00.000Z")
    end_date_str = end_date.strftime("%Y-%m-%dT05:00:00.000Z")
    
    # Build the JSON payload
    data = { # type: ignore
        "filter": {
            "active": True,
            "$and": [
                {
                    "categories.catId": {
                        "$in": [
                            "1", "2", "25", "5", "6", "21", "9", "22", "19", "3", "12", "7", "8", "31", 
                            "10", "11", "24", "13", "14", "29", "16", "15", "23", "17"
                        ]
                    }
                }
            ],
            "date_range": {
                "start": {"$date": start_date_str},
                "end": {"$date": end_date_str}
            }
        },
        "options": {
           # LOL! ideally you'd page through them but we don't got time for that!
            "limit": 1000,
            "skip": 0,
            "count": True,
            "castDocs": False,
            "fields": {
                "_id": 1, "location": 1, "date": 1, "startDate": 1, "endDate": 1, "recurrence": 1,
                "recurType": 1, "latitude": 1, "longitude": 1, "media_raw": 1, "recid": 1, "title": 1,
                "url": 1, "categories": 1, "listing.primary_category": 1, "listing.title": 1, "listing.url": 1
            },
            "hooks": [],
            "sort": {"date": 1, "rank": 1, "title_sort": 1}
        }
    }

    # Encode JSON data and append to URL
    encoded_data = urlencode({'json': json.dumps(data), 'token': token}) # type: ignore
    full_url = f"{base_url}{encoded_data}"
    return full_url

def lawrenceks() -> None:  
  # SAMPLE CATEGORIES
  # Family (12)                     id 6
  # Music (12)                      id 11
  # Lectures/Education (10)         id 31
  # Literary (9)
  # Other (9)
  # Arts (7)                        id 2
  # Exhibits (7)                    id 5
  # History (6)
  # Sports/Recreation (6)           id 15
  # Agri-Tourism (4)
  # Performance (4)
  # Festival (3)                     
  # Food (3)                        id 3
  # Shopping (3)
  # Farmers Market (2)              id 21
  # Wellness (2)                    id 17
  # College Sports (1)
  # Film (1)
  # Native American Culture (1)
  # Pet Friendly (1)
  # Virtual Event (1)
  token = __get_token()
  start_date = datetime.now(timezone.utc)
  end_date = start_date + timedelta(days=30)
  
  request_url = __build_url(token, start_date, end_date)
  
  response = requests.get(request_url)
  response.raise_for_status()  # Raises an HTTPError for bad requests
  json_response = response.json()
  # ^^^ I'm pretty sure these guys are also using mongo

  client = MongoClient(os.getenv('MONGODB_URI')) # type: ignore
  db = client['db'] # type: ignore
  collection = db['events'] # type: ignore
  
  operations = []
  for event in json_response.get('docs', {}).get('docs', []):
      operations.append(UpdateOne( # type: ignore
          {"_id": event['_id']},  # Filter document by '_id'
          {"$set": event},        # Update or set fields of the document
          upsert=True             # Insert a new document if none match the filter
      ))

  # Perform the bulk operation
  if operations:
      collection.bulk_write(operations) # type: ignore
