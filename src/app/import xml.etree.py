import xml.etree.ElementTree as ET

# Load the XML data from the file
tree = ET.parse('www.explorelawrence.xml')
root = tree.getroot()

# List to store dictionaries for each item
items_list = []

# Iterate over each <item> element in the XML
for item in root.findall('./channel/item'):
    item_dict = {}
    item_dict['title'] = item.find('title').text
    item_dict['link'] = item.find('link').text
    item_dict['category'] = item.find('category').text
    item_dict['pubDate'] = item.find('pubDate').text
    item_dict['description'] = item.find('description').text
    
    # Extract latitude and longitude if available
    latitude = None
    longitude = None
    for child in item.findall('*'):
        if child.tag.endswith('lat'):
            latitude = float(child.text)
        elif child.tag.endswith('long'):
            longitude = float(child.text)
    
    item_dict['latitude'] = latitude
    item_dict['longitude'] = longitude
    
    # Append the dictionary to the list
    items_list.append(item_dict)

# Print the list of dictionaries
for item in items_list:
    print(item)
    print()
