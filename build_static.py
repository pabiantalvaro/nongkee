"""
build_static.py: Export Django templates and static assets into public/ for Firebase Hosting deployment.
"""
import os
import shutil
from pathlib import Path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django
django.setup()

from django.test import Client

def build():
    client = Client()
    routes = [
        ('/', 'index.html'),
        ('/friends/', 'friends/index.html'),
        ('/rooms/', 'rooms/index.html'),
        ('/login/', 'login/index.html'),
        ('/signup/', 'signup/index.html'),
    ]

    public_dir = Path('public')
    public_dir.mkdir(exist_ok=True)

    for route, filename in routes:
        out_path = public_dir / filename
        out_path.parent.mkdir(parents=True, exist_ok=True)
        resp = client.get(route)
        if resp.status_code == 200:
            out_path.write_bytes(resp.content)
            print(f"Exported {route} -> {out_path} ({len(resp.content)} bytes)")
        else:
            print(f"Failed to export {route}: status {resp.status_code}")

    static_dest = public_dir / 'static' / 'meets'
    static_dest.mkdir(parents=True, exist_ok=True)
    shutil.copy('meets/static/meets/nongkee.css', static_dest / 'nongkee.css')
    shutil.copy('meets/static/meets/nongkee.js', static_dest / 'nongkee.js')
    print("Static assets exported successfully.")

if __name__ == '__main__':
    build()
