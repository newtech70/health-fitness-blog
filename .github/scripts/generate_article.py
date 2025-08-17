import requests
import datetime
import random
import os

# Env vars
hf_token = os.environ['HF_TOKEN']
aff_id = os.environ['AFFILIATE_ID']

# Topics for health/fitness
topics = ["home workouts", "healthy diets", "yoga benefits", "weight loss tips", "muscle building"]
languages = ["en", "fr", "es"]
topic = random.choice(topics)

# Function to generate text via HF
def generate_text(prompt, model="mistralai/Mistral-7B-Instruct-v0.2"):
    url = f"https://api-inference.huggingface.co/models/{model}"
    headers = {"Authorization": f"Bearer {hf_token}"}
    data = {"inputs": prompt, "parameters": {"max_length": 1500}}
    response = requests.post(url, headers=headers, json=data)
    return response.json()[0]['generated_text']

# Function to translate via LibreTranslate
def translate(text, target_lang):
    if target_lang == "en": return text
    url = "https://libretranslate.com/translate"
    data = {"q": text, "source": "en", "target": target_lang, "format": "text"}
    response = requests.post(url, data=data)
    return response.json()['translatedText']

# Generate English base
prompt = f"Write a 1000-word SEO-optimized article on '{topic}' for a health blog. Include headings, lists, and end with product recommendations."
en_content = generate_text(prompt)
en_content += f"\n\nBuy recommended products: https://amazon.com/search?q={topic.replace(' ', '+')}&tag={aff_id}-20"

# Save for each lang
articles_dir = 'content/articles'
os.makedirs(articles_dir, exist_ok=True)
date_slug = datetime.date.today().isoformat()

for lang in languages:
    translated = translate(en_content, lang)
    title = f"# {topic.capitalize()} - {lang.upper()}"
    file_content = title + "\n\n" + translated
    slug = f"{date_slug}-{topic.replace(' ', '-')}-{lang}.md"
    with open(f"{articles_dir}/{slug}", 'w') as f:
        f.write(file_content)
