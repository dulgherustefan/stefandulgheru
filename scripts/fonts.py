"""Rebuild the trimmed web fonts in src/assets/fonts/.

Downloads the original variable fonts from the Google Fonts repo, keeps only the
Latin characters and the axis ranges the site uses, and writes WOFF2 files.

    pip install fonttools brotli
    python3 scripts/fonts.py
"""

import os
import urllib.request
from io import BytesIO

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

OUT = os.path.join(os.path.dirname(__file__), "..", "src", "assets", "fonts")
SOURCE = "https://github.com/google/fonts/raw/main/ofl"

# Basic Latin + Latin-1, Latin Extended-A, Romanian comma-below letters (Ș ș Ț ț),
# general punctuation, super/subscripts, currency, letterlike symbols, arrows, minus.
UNICODES = "U+0000-00FF,U+0100-017F,U+0218-021B,U+2000-206F,U+2070-209F,U+20A0-20C0,U+2100-214F,U+2190-21FF,U+2212,U+FEFF"

FONTS = [
    # (source path, axis limits, output file)
    ("bricolagegrotesque/BricolageGrotesque%5Bopsz,wdth,wght%5D.ttf", {"opsz": (12, 28), "wght": 600, "wdth": 100}, "bricolage-600.woff2"),
    ("hankengrotesk/HankenGrotesk%5Bwght%5D.ttf", {"wght": (400, 600)}, "hanken-400-600.woff2"),
]


def build(path, limits, out):
    with urllib.request.urlopen(f"{SOURCE}/{path}") as res:
        font = TTFont(BytesIO(res.read()), lazy=False)
    # Subset glyphs before instancing; the other order trips over lazily loaded variation data.
    options = subset.Options()
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.notdef_outline = True
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=subset.parse_unicodes(UNICODES))
    subsetter.subset(font)
    font = instancer.instantiateVariableFont(font, limits)
    font.flavor = "woff2"
    dest = os.path.join(OUT, out)
    font.save(dest)
    print(f"{out}: {os.path.getsize(dest) // 1024} KB")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for args in FONTS:
        build(*args)
