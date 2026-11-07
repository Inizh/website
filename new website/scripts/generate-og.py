from PIL import Image, ImageDraw, ImageFont
import os

root = os.path.join(os.path.dirname(__file__), "..", "public", "images", "brand")
os.makedirs(root, exist_ok=True)
img = Image.new("RGB", (1200, 630), "#0a0a0a")
draw = ImageDraw.Draw(img)
try:
    font = ImageFont.truetype("arial.ttf", 72)
    small = ImageFont.truetype("arial.ttf", 32)
except Exception:
    font = ImageFont.load_default()
    small = ImageFont.load_default()
draw.text((80, 220), "Inizh", fill="#D4AF37", font=font)
draw.text((80, 320), "IoT · Software · Games", fill="#eeeeee", font=small)
img.save(os.path.join(root, "og-default.png"))
print("Saved og-default.png")
