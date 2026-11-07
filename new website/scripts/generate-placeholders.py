from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.join(os.path.dirname(__file__), "..", "public")

def save(path, color, label, size=(1200, 800)):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    img = Image.new("RGB", size, color)
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 48)
    except Exception:
        font = ImageFont.load_default()
    bbox = draw.textbbox((0, 0), label, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = (size[0] - text_w) // 2
    y = (size[1] - text_h) // 2
    draw.text((x, y), label, fill="white", font=font)
    img.save(full, "WEBP")
    print(f"Saved {full}")

# Brand
save("images/brand/hero.webp", "#1a1a1a", "Hero", (1600, 900))

# Products
save("images/products/smart-hub.webp", "#2d2d2d", "Smart Hub")
save("images/products/smart-hub-2.webp", "#333333", "Smart Hub 2")
save("images/products/field-monitor.webp", "#1e3a2f", "Field Monitor")
save("images/products/dash-stack.webp", "#1a2b3c", "Dash Stack")
save("images/products/connect-bridge.webp", "#2c1e3a", "Connect Bridge")

# Games
for name in ["ride-along", "yoi-yurei", "space-shooter", "love-games"]:
    save(f"images/games/{name}-cover.webp", "#111111", name.replace("-", " ").title(), (800, 1000))
    save(f"images/games/{name}-banner.webp", "#151515", name.replace("-", " ").title(), (1600, 600))

# Blog
save("images/blog/mqtt.webp", "#0f172a", "MQTT")
save("images/blog/prototype.webp", "#1c1917", "Prototype")
save("images/blog/game-engine.webp", "#1e1b4b", "Game Engine")
save("images/blog/dashboard.webp", "#0c4a6e", "Dashboard")
save("images/blog/lora.webp", "#14532d", "LoRa")
save("images/blog/ride-along-dev.webp", "#312e81", "Ride Along Dev")

# Team
save("images/team/inizh-team.webp", "#3f3f46", "Inizh Team", (800, 800))
save("images/team/placeholder.webp", "#52525b", "Placeholder", (800, 800))
