#!/usr/bin/env python3
import os
import requests
import json

API_KEY = os.environ.get("MINIMAX_API_KEY", "")
BASE_URL = "https://api.minimax.io"

def gen_image(prompt, output_path):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {"model": "image-01", "prompt": prompt}
    resp = requests.post(f"{BASE_URL}/v1/image_generation", json=payload, headers=headers, timeout=60)
    resp.raise_for_status()
    data = resp.json()
    
    image_urls = data.get("data", {}).get("image_urls", [])
    if not image_urls:
        print(f"ERROR: No image URL in response: {data}")
        return None
    
    image_url = image_urls[0]
    print(f"URL: {image_url}")
    
    # Download the image
    img_resp = requests.get(image_url, timeout=60)
    img_resp.raise_for_status()
    with open(output_path, "wb") as f:
        f.write(img_resp.content)
    print(f"SUCCESS: {output_path}")
    return output_path

if __name__ == "__main__":
    images = [
        (
            "Beautiful beaded jewelry including earrings and necklaces on wire, pastel rose pink and cream colored beads with gold accents, aesthetic craft feel, soft natural lighting, flat lay composition, high quality product photograph",
            "/home/o/workspace/start-here-jewelry/beading.jpg"
        ),
        (
            "Wire wrapped crystal stone pendant and rustic wire wrapped bracelet, charcoal gray wire wrapped around natural sage green gemstones, gold wire accents, rustic handmade jewelry craft aesthetic, warm natural lighting, flat lay",
            "/home/o/workspace/start-here-jewelry/wire-wrapping.jpg"
        ),
        (
            "Elegant sterling silver ring with detailed stamp marks on a dark charcoal background, metallic silver surface with sharp precise design, minimalist luxury jewelry photography, professional product shot, high contrast lighting",
            "/home/o/workspace/start-here-jewelry/silver-curious.jpg"
        ),
    ]
    
    for prompt, path in images:
        print(f"\nGenerating: {path}")
        result = gen_image(prompt, path)
        if result:
            size = os.path.getsize(result)
            print(f"  Saved {size} bytes")
