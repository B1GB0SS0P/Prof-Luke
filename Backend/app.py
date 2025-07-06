import openai
import base64
import csv
import os
import shutil
from tqdm import tqdm



print('👋 Hi Luke!')
print('Welcome to your Image Inserter!')
print()
def encodeImage(image_path): #encoder
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")
print('Loading Files...')    
image_dir = os.path.abspath(r'./Backend/images')
image_paths = []
for root, _, files in os.walk(image_dir):
    for file in files:
        image_paths.append(os.path.join(root, file))
print('Files Loaded!')

# Walk through images folder where all the pics shld be
for filePath in tqdm(image_paths, desc="Processing images"):
    image = encodeImage(filePath)
    # response = openai.ChatCompletion.create(
    #     model="gpt-4o",
    #     messages=[
    #         {
    #             "role": "user",
    #             "content": [
    #                 {"type": "text", "text": """I want you to convert all the handwritten words from this picture into text. Id like you to send the text in this format. 

    # Date:
    # Title:
    # Content:
    # Speaker: 

    # The date is quite self explanatory, the title is likely to be on the very first line, the speaker is the person that spoke if mentioned. 

    # For the content. Send me the content in this format. For every new line, call it point 1, and 2 and so on. If there is a biblical verse, i want you to put a - on the new line with the verse. """},
    #                 {"type": "image_url", "image_url": {
    #                     "url": f"data:image/jpeg;base64,{base64_image}"
    #                 }},
    #             ],
    #         }
    #     ],
    #     max_tokens=1000
    # )

    # text = response['choices'][0]['message']['content']

    # Sample text
    text = """Date:
    29 January 2022

    Title:
    A People of Presence

    Content:
    1. A people who obeys in faith.
    2. Obedience leads to encountering God.
    3. A people who walks in unity.
    4. Unity must be expressed.
    - Psalms 133
    5. A people who seek and depend on the Holy Spirit.
    - 1 Corinthians 2:4-5

    Speaker:
    Ps Tina
    """

    # Split into lines
    lines = [line.strip() for line in text.strip().splitlines() if line.strip()]

    def find_index(label):
        for i, line in enumerate(lines):
            if line == label:
                return i
        return -1

    date_idx = find_index("Date:")
    title_idx = find_index("Title:")
    content_idx = find_index("Content:")
    speaker_idx = find_index("Speaker:")

    # Extract values safely
    date = lines[date_idx + 1] if date_idx != -1 and date_idx + 1 < len(lines) else ""
    title = lines[title_idx + 1] if title_idx != -1 and title_idx + 1 < len(lines) else ""
    speaker = lines[speaker_idx + 1] if speaker_idx != -1 and speaker_idx + 1 < len(lines) else ""

    # Extract content block
    content_lines = []
    if content_idx != -1 and speaker_idx != -1:
        content_lines = lines[content_idx + 1:speaker_idx]
    content = " | ".join(content_lines)

    # Save results into luke.csv
    with open("luke.csv", "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([date, title, content, speaker])
    
    # Move image from images to completed
    file = os.path.basename(filePath)
    shutil.move(filePath, os.path.join(r'./Backend/completed', file))

print("All done! Thank you for using the image inserter:)")