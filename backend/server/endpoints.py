import re
import json

NOT_FOUND = {
    "statusCode": 404,
    "headers": {"Content-Type": "application/json"},
    "body": json.dumps("Error: Not Found")
}

def sign_up(event):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps("/sign-up")
    }

def login(event):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps("/login")
    }

def invite(event):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps("/invite")
    }

def upload(event):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps("/upload")
    }

def delete(event):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps("/delete")
    }

def fetch(event):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps("/fetch")
    }

ROUTES = [
    (re.compile(r"/sign-up$"), sign_up),
    (re.compile(r"/login$"), login),
    (re.compile(r"/invite/(\w+)$"), invite),
    (re.compile(r"/upload$"), upload),
    (re.compile(r"/delete/(\w+)$"), delete),
    (re.compile(r"/fetch/(\w+)/(\w+)$"), fetch)
]
