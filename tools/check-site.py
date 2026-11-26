#!/usr/bin/env python3
"""Check the site before publishing. Run from the site folder:

    python3 tools/check-site.py

It FAILS (and nothing should be published) when:
  - a photo in images/ still carries hidden data (EXIF, GPS, XMP, IPTC, comments, text)
  - a photo or file the site points to is missing
  - a page, script or stylesheet loads something from a website not on the list below
  - a text file is not plain UTF-8
It WARNS when placeholders are still in: the sample email, the sample WhatsApp number, sample photos.
"""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

# Websites the site may load things from or post a form to. Anything else fails the check.
ALLOWED_HOSTS = {"app.kit.com", "kit.com", "wa.me", "instagram.com", "www.instagram.com", "docs.github.com"}
# Allowed for now with a warning: sample photos until real ones replace them.
TEMPORARY_HOSTS = {"picsum.photos"}
# Addresses that are only written in comments or as examples, not loaded.
IGNORED_HOSTS = {"www.w3.org"}
PLACEHOLDERS = {"you@example.com": "the sample email address", "910000000000": "the sample WhatsApp number",
                "picsum.photos": "sample photos from another website"}
TEXT_FILES = sorted(glob.glob("*.html") + glob.glob("*.js") + glob.glob("*.css") + ["robots.txt", ".well-known/security.txt"])

errors, warnings = [], []


def readable(text):
    """The text without its comment lines and the security rule, which only name hosts and examples."""
    text = re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]*>', "", text)
    return "\n".join(line for line in text.splitlines() if not line.lstrip().startswith(("//", "/*", "*", "<!--")))


def check_images():
    try:
        from PIL import Image
    except ImportError:
        errors.append("Pillow is not installed, so photos can't be checked (pip install pillow)")
        return
    for path in sorted(glob.glob("images/*")):
        if os.path.basename(path).startswith("."):
            continue
        raw = open(path, "rb").read()
        try:
            with Image.open(path) as im:
                found = []
                if im.getexif():
                    found.append("GPS location" if im.getexif().get_ifd(0x8825) else "camera data (EXIF)")
                for key in ("xmp", "XML:com.adobe.xmp", "photoshop", "comment", "Comment", "icc_profile"):
                    if im.info.get(key):
                        found.append(key)
                found += [f"text '{k}'" for k in getattr(im, "text", {})]
        except Exception as e:
            errors.append(f"{path}: can't be read as an image ({e})")
            continue
        for marker, name in ((b"http://ns.adobe.com/xap", "XMP"), (b"Photoshop 3.0", "IPTC"), (b"GPS", "GPS text")):
            if marker in raw[:65536] and name not in " ".join(found):
                found.append(name)
        if found:
            errors.append(f"{path}: hidden data inside ({', '.join(sorted(set(found)))}). Re-save it clean before publishing")


def check_text_and_hosts():
    for path in TEXT_FILES:
        if not os.path.exists(path):
            continue
        raw = open(path, "rb").read()
        try:
            text = raw.decode("utf-8")
        except UnicodeDecodeError:
            errors.append(f"{path}: not plain UTF-8 text")
            continue
        text = readable(text)
        # every address with a host: https://x, //x, wss://x ...
        for host in set(re.findall(r"""(?:[a-z][a-z0-9+.-]*:)?//([a-z0-9.-]+\.[a-z]{2,})""", text, re.I)):
            host = host.lower()
            if host in ALLOWED_HOSTS or host in IGNORED_HOSTS:
                continue
            if host in TEMPORARY_HOSTS:
                continue  # reported once below as a placeholder
            errors.append(f"{path}: loads or links to {host}, which is not on the allowed list")
        for needle, what in PLACEHOLDERS.items():
            if needle in text:
                warnings.append(f"{path}: still has {what}")


def check_files_exist():
    referenced = set()
    for path in TEXT_FILES:
        if os.path.exists(path):
            text = readable(open(path, encoding="utf-8", errors="replace").read())
            referenced |= set(re.findall(r"""["'(]((?:images|fonts)/[^"')\s]+)""", text))
            referenced |= {m for m in re.findall(r'(?:href|src)="([a-z0-9-]+\.(?:html|js|css|svg))"', text)}
    for ref in sorted(referenced):
        if not os.path.exists(ref):
            errors.append(f"missing file: {ref}")


check_images()
check_text_and_hosts()
check_files_exist()

for w in sorted(set(warnings)):
    print("WARNING ", w)
for e in errors:
    print("FAIL    ", e)
photos = len([p for p in glob.glob("images/*") if not os.path.basename(p).startswith(".")])
print(f"\nChecked {photos} photos and {len(TEXT_FILES)} files: "
      + ("ALL GOOD, safe to publish." if not errors else f"{len(errors)} problem(s). Fix them before publishing."))
sys.exit(1 if errors else 0)
