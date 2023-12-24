def sign_up(event):
    return {"status": 200, "body": "/sign-up"}

def login(event):
    return

def invite(event):
    return

def upload(event):
    return

def delete(event):
    return

def fetch(event):
    return

ROUTES = {
    "/sign-up": sign_up,
    "/login": login,
    "/invite/{invite-token}": invite,
    "/upload": upload,
    "/delete/{deletion-method}": delete, 
    "/fetch/{team-id}/{user-id}/": fetch
}