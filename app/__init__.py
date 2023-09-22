# app/__init__.py
from flask import Flask
from app.controllers.api_controller import api_controller

app = Flask(__name__)
app.register_blueprint(api_controller)

if __name__ == "__main__":
    app.run()
