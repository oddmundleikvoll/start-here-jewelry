#!/usr/bin/env python3
"""
Send emails to Resend subscribers.
Usage:
  python3 send_email.py welcome                      # Send welcome to all unsent
  python3 send_email.py path-specific --path beading-starter  # Send to subscribers with this path
  python3 send_email.py status                       # Show subscriber stats
  python3 send_email.py list                         # List all subscribers
"""

import json
import sys
import time
import argparse
import urllib.request
import urllib.parse
from datetime import datetime, timedelta

RESEND_API_KEY = "re_iREQfF7f_EBt5gq7xdigw8Cw9xQdFvaer"
AUDIENCE_ID = "e30ee504-1ace-4ef6-b334-734ee818ee5e"
FROM_EMAIL = "Start Here Jewelry <noreply@wntviral.com>"

EMAIL_TEMPLATES = {
    "beading-starter": "emails/beading-starter.html",
    "wire-wrapping-starter": "emails/wire-wrapping-starter.html",
    "silver-curious-starter": "emails/silver-curious-starter.html",
}


def resend_request(method, path, data=None):
    url = f"https://api.resend.com{path}"
    req = urllib.request.Request(url, method=method)
    req.add_header("Authorization", f"Bearer {RESEND_API_KEY}")
    req.add_header("Content-Type", "application/json")
    req.add_header("User-Agent", "Mozilla/5.0 (script; python3)")
    if data:
        req.data = json.dumps(data).encode()
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def get_subscribers():
    contacts = []
    cursor = None
    while True:
        url = f"/audiences/{AUDIENCE_ID}/contacts?limit=100"
        if cursor:
            url += f"&starting_after={cursor}"
        data = resend_request("GET", url)
        contacts.extend(data.get("data", []))
        if not data.get("has_more"):
            break
        cursor = contacts[-1]["id"] if contacts else None
    return contacts


def send_email(to, subject, html_path, from_email=FROM_EMAIL):
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    return resend_request("POST", "/emails", {
        "from": from_email,
        "to": [to],
        "subject": subject,
        "html": html,
    })


def cmd_status():
    contacts = get_subscribers()
    print(f"\n📊 Resend-abonnenter ({len(contacts)} totalt)\n")
    paths = {}
    for c in contacts:
        p = c.get("first_name", "") or "Ukjent"
        paths[p] = paths.get(p, 0) + 1
    for k, v in sorted(paths.items(), key=lambda x: -x[1]):
        print(f"  {k:25} {v}")


def cmd_list():
    contacts = get_subscribers()
    print(f"\n📋 Alle abonnenter ({len(contacts)})\n")
    for c in contacts:
        created = c.get("created_at", "")[:10]
        email = c.get("email", "?")
        name = c.get("first_name", "")
        print(f"  {created}  {email:30}  path={name}")


def cmd_send_path(path):
    if path not in EMAIL_TEMPLATES:
        print(f"Ukjent path: {path}")
        print(f"Tilgjengelige: {', '.join(EMAIL_TEMPLATES.keys())}")
        return

    contacts = get_subscribers()
    html_path = EMAIL_TEMPLATES[path]

    path_names = {
        "beading-starter": "Beading",
        "wire-wrapping-starter": "Wire Wrapping",
        "silver-curious-starter": "Silver Curious",
    }
    subject = f"Din {path_names[path]} Start-plan — steg for steg"

    sent = 0
    errors = 0
    for c in contacts:
        email = c.get("email")
        first_name = c.get("first_name", "")
        # Only send to subscribers with matching path
        if first_name and path in first_name.lower():
            continue  # Skip if already named (sent indicator)
        try:
            # Update contact name as "sent" marker
            resend_request("PATCH", f"/audiences/{AUDIENCE_ID}/contacts/{c['id']}", {
                "first_name": f"sent:{path}",
            })
            result = send_email(email, subject, html_path)
            if result.get("id"):
                sent += 1
                print(f"  ✓ {email}")
            else:
                errors += 1
                print(f"  ✗ {email}: {result}")
        except Exception as e:
            errors += 1
            print(f"  ✗ {email}: {e}")
        time.sleep(0.3)  # Rate limit

    print(f"\n✅ Sendt til {sent} mottakere ({errors} feil)")


def cmd_welcome():
    contacts = get_subscribers()
    welcome_path = "emails/beading-starter.html"  # Use beading as general welcome

    subject = "Velkommen til Start Here Jewelry! 🎉"
    sent = 0
    errors = 0
    for c in contacts:
        email = c.get("email")
        # Skip if already sent (has "sent" in first_name)
        if c.get("first_name", "").startswith("sent:"):
            continue
        try:
            # Mark as sent
            resend_request("PATCH", f"/audiences/{AUDIENCE_ID}/contacts/{c['id']}", {
                "first_name": "sent:welcome",
            })
            result = send_email(email, subject, welcome_path)
            if result.get("id"):
                sent += 1
                print(f"  ✓ {email}")
            else:
                errors += 1
                print(f"  ✗ {email}: {result}")
        except Exception as e:
            errors += 1
            print(f"  ✗ {email}: {e}")
        time.sleep(0.3)

    print(f"\n✅ Sendt til {sent} mottakere ({errors} feil)")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("cmd", choices=["status", "list", "welcome", "path-specific"])
    parser.add_argument("--path", help="Path for path-specific emails")
    args = parser.parse_args()

    if args.cmd == "status":
        cmd_status()
    elif args.cmd == "list":
        cmd_list()
    elif args.cmd == "welcome":
        cmd_welcome()
    elif args.cmd == "path-specific":
        if not args.path:
            print("Bruk: send_email.py path-specific --path beading-starter")
            sys.exit(1)
        cmd_send_path(args.path)
