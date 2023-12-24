def sign_up(event):
    print("sign-up")
    return

def login(event):
    print("login")
    return

def invite(event):
    print("invite")
    return

def upload(event):
    print("upload")
    return

def delete(event):
    print("delete")
    return

def fetch(event):
    print("fetch")
    return

ROUTES = {
    "/sign-up": sign_up,
    "/login": login,
    "/invite/{invite-token}": invite,
    "/upload": upload,
    "/delete/{deletion-method}": delete, 
    "/fetch/{team-id}/{user-id}/": fetch
}