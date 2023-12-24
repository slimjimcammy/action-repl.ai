from endpoints import *

def handler(event, context):
    path = event["resource"]
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(message)
    }

    # return ROUTES[path](event)


