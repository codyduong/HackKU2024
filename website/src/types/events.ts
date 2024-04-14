export type Event = {
  _id: string;
  latitude: number;
  longitude: number;
  title: string;
  location: string;
  date: string;
  startDate: string;
  endDate: string;
  recurrence: string;
  recurType: number;
  media_raw: {
    mediaurl: string;
    sortorder: number;
    mediatype: string;
  }[];
  recid: string;
  url: string;
  categories: {
    catName: string;
    catId: string;
  }[];
  listing: {
    primary_category: {
      primary: boolean;
      subcatid: number;
      subcatname: string;
      catname: string;
      catid: number;
    };
    title: string;
    url: string;
  };
};

/*
{
  "_id": "661368464ce7d39ef53a953b",
  "location": "University of Kansas / KU Memorial Unions",
  "date": "2024-04-18T04:59:59.000Z",
  "startDate": "2024-03-20T05:00:00.000Z",
  "endDate": "2024-05-02T04:59:59.000Z",
  "recurrence": "Recurring weekly on Wednesday",
  "recurType": 3,
  "latitude": 38.9595782,
  "longitude": -95.2434651,
  "media_raw": [
    {
      "mediaurl": "https://assets.simpleviewinc.com/simpleview/image/upload/crm/lawrence/Russian-Table-1-_7097E99B-CAE7-E939-15AF053119A56529_70a3c653-ac84-7e9f-d48ba1ec404ee013.png",
      "sortorder": 1,
      "mediatype": "Image"
    }
  ],
  "recid": "32249",
  "title": "Russian Language Conversation Table",
  "url": "/event/russian-language-conversation-table/32249/",
  "categories": [
    {
      "catName": "Other",
      "catId": "13"
    },
    {
      "catName": "Lectures/Education",
      "catId": "31"
    }
  ],
  "listing": {
    "primary_category": {
      "primary": true,
      "subcatid": 69,
      "subcatname": "Meeting Venues",
      "catname": "Venues",
      "catid": 4
    },
    "title": "University of Kansas / KU Memorial Unions",
    "url": "/listing/university-of-kansas-ku-memorial-unions/279/"
  },
  "source": "lawrenceks"
}
*/

export type Events = Event[];
