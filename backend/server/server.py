from endpoints import *

def handler(event, context):
    path = event["resource"]

    return ROUTES[path](event)


