from flask import Flask
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

@app.route("/")
def home():
    return "SmartDocs Assistant Backend Running 🚀"

if __name__ == "__main__":
    app.run(debug=True)