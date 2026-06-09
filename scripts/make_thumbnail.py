from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
src = root / 'errors' / 'fix-page.png'
out = root / 'errors' / 'fix-page-thumb.png'
with Image.open(src) as img:
    w, h = img.size
    target_h = min(h, 1200)
    img = img.resize((w, target_h), resample=Image.LANCZOS)
    img.save(out)
print('wrote', out, out.stat().st_size)
