from endpoints import *

def dispatcher(event):
    path = event["rawPath"]
    print(f"Checking path: {path}")
    
    for ROUTE, CALLBACK in ROUTES:
        if ROUTE.match(path):
            return CALLBACK(event)
    
    return NOT_FOUND


def handler(event, context):
    response = dispatcher(event)
    return response
