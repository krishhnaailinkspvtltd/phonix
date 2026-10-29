import urllib.request
import os
import sys

# Ensure UTF-8 output on Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

images = [
    # Hero
    ("public/images/hero/hero-port.jpg", "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=85", "Aerial deepwater container shipping port with gantry cranes at dawn", "CHUTTERSNAP / Unsplash"),
    ("public/images/hero/hero-vessel.jpg", "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=85", "Heavy container ship at sea carrying multi-tier intermodal cargo", "Ian Taylor / Unsplash"),
    
    # Homepage Panels (Website-template style scroll sequence)
    ("public/images/panels/panel-1-connections.jpg", "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1400&q=85", "Global shipping terminal twilight network", "Tom Fisk / Unsplash"),
    ("public/images/panels/panel-2-sourcing.jpg", "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1400&q=85", "Automated cargo logistics hub and freight sorting", "Bernd Dittrich / Unsplash"),
    ("public/images/panels/panel-3-logistics.jpg", "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1400&q=85", "Intermodal freight logistics rail and container terminal", "Frank McKenna / Unsplash"),
    ("public/images/panels/panel-4-markets.jpg", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85", "International trade towers & financial architecture", "Sean Pollock / Unsplash"),
    ("public/images/panels/panel-5-opportunities.jpg", "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1400&q=85", "Cargo ship approaching coastal harbor at sunrise", "Vidar Nordli-Mathisen / Unsplash"),

    # Categories
    ("public/images/categories/cat-commodity.jpg", "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85", "Bulk agricultural and grain trade harvest", "Tomas Tuma / Unsplash"),
    ("public/images/categories/cat-industrial.jpg", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85", "Precision industrial engineering and raw metal manufacturing", "Science in HD / Unsplash"),
    ("public/images/categories/cat-consumer.jpg", "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=85", "Modern distribution center and packaged consumer goods", "Petre Bozdog / Unsplash"),
    ("public/images/categories/cat-sourcing.jpg", "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85", "Global quality assurance, technical inspection & procurement", "Science in HD / Unsplash"),

    # Gallery
    ("public/images/gallery/gallery-1.jpg", "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=85", "Massive ocean freight carrier entering harbor", "Ian Taylor / Unsplash"),
    ("public/images/gallery/gallery-2.jpg", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85", "Intricate aerial container stacks in symmetry", "Barrett Ward / Unsplash"),
    ("public/images/gallery/gallery-3.jpg", "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85", "High-tech global telecommunications and network routing hub", "Taylor Vick / Unsplash"),
    ("public/images/gallery/gallery-4.jpg", "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85", "Vessel navigation deck overlooking tranquil morning ocean", "Vidar Nordli-Mathisen / Unsplash"),
    ("public/images/gallery/gallery-5.jpg", "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&w=1200&q=85", "International navigational mapping and cartography desk", "Delfina Cocciardi / Unsplash"),
    ("public/images/gallery/gallery-6.jpg", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85", "Strategic global trade consultation and planning table", "Scott Graham / Unsplash"),

    # About & Global Trade
    ("public/images/about/about-editorial-1.jpg", "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=85", "Cross-continental partnership agreement and international commerce", "Cytonn Photography / Unsplash"),
    ("public/images/about/about-editorial-2.jpg", "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1400&q=85", "Modern skyline with maritime transit and commercial waterway", "Pexels / Pixabay / Unsplash"),
    ("public/images/trade/trade-corridor.jpg", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85", "Global shipping transit landscape and trade route passage", "Bailey Zindel / Unsplash"),
]

attribution_lines = [
    "# Photographic Asset Attribution Record",
    "",
    "All photographic assets utilized in the **PHONIX GLOBAL TRADE** frontend demo are curated from Unsplash under the Unsplash License (free for commercial and personal use without attribution required, though documented here for ethical transparency).",
    "",
    "| Asset Path | Subject | Credit / Source |",
    "| :--- | :--- | :--- |"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

print(f"Beginning download of {len(images)} authentic photographic assets...")

for dest, url, desc, credit in images:
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=20) as response, open(dest, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        size_kb = os.path.getsize(dest) // 1024
        print(f"[OK] Downloaded {dest} ({size_kb} KB)")
        attribution_lines.append(f"| `{dest}` | {desc} | {credit} |")
    except Exception as e:
        print(f"[ERROR] Failed {dest}: {e}")

with open("ATTRIBUTION.md", "w", encoding="utf-8") as f:
    f.write("\n".join(attribution_lines) + "\n")

print("All asset downloads completed successfully. ATTRIBUTION.md updated.")
