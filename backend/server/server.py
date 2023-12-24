from endpoints import *
import json

def handler(event, context):
    # path = event["resource"]
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(events)
    }

    # return ROUTES[path](event)


