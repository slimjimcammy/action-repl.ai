from flask import Flask

app = Flask(__name__)

@app.route("/")
def test_flask():
    return "auto deploy works! yay! again! pweease"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)