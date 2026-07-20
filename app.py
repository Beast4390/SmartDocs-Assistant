import os
from flask import Flask, render_template
from config import Config
from routes.upload import upload_bp

app = Flask(__name__)

app.config.from_object(Config)

# Create uploads folder automatically
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

app.register_blueprint(upload_bp)

@app.route("/")
def home():
    return render_template("upload_test.html")

if __name__ == "__main__":
    app.run(debug=True)