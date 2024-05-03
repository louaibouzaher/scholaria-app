import os
import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO

def get_google_search_image(query):
    """Fetch the first image result from Google Image Search."""
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    headers = {'User-Agent': user_agent}

    # Preparing the Google search URL
    search_url = f"https://www.google.com/search?hl=en&tbm=isch&q={query}"

    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    images = soup.find_all('img')

    # Find the first actual image result (ignoring possible advertisement images)
    for img in images:
        # Google image results start with data:image
        if img['src'].startswith('http'):
            return img['src']

    return None

def download_image(image_url, file_path):
    """Download an image from a URL and save it to a file."""
    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content))
    image.save(file_path)

# List of authors to search images for
authors = ["Songwei Ge", "Aniruddha Mahapatra", "Gaurav Parmar", "Yu Wang", "Shu-Rui Zhang",
           "Junyu Xie", "Charig Yang", "Weidi Xie", "Andrew Zisserman"]

# Directory to save images
os.makedirs('author_images', exist_ok=True)

for author in authors:
    image_url = get_google_search_image(author)
    if image_url:
        file_name = f"author_images/{author.replace(' ', '_')}.jpg"
        download_image(image_url, file_name)
        print(f"Downloaded {file_name}")
    else:
        print(f"No image found for {author}")

