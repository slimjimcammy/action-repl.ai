from endpoints import *

def handler(event, context):
    path = event["resource"]
    return {"test": path}

    return ROUTES[path](event)


