from pathlib import Path
from PIL import Image
root = Path(__file__).resolve().parent.parent
src = root / 'errors' / 'fix-page.png'
img = Image.open(src)
width, height = img.size
segment_height = min(1200, height)
for i in range(0, height, segment_height):
    box = (0, i, width, min(i + segment_height, height))
    segment = img.crop(box)
    segment.save(root / 'errors' / f'fix-page-seg-{i//segment_height}.png')
    print('saved', f'fix-page-seg-{i//segment_height}.png', segment.size)
