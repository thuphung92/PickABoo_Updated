from flask import Flask
from config import Config
from flask_login import LoginManager 
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate
from flask_cors import CORS

login = LoginManager()

login.login_view = 'auth.login'
login.login_message = "You must be logged in to view the page"
login.login_message_category = "warning"

db = SQLAlchemy()

migrate = Migrate()
cors= CORS()


def create_app(config_class=Config):

    app = Flask(__name__)
    app.config.from_object(config_class)
    login.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    cors.init_app(app)

    from .blueprints.auth import bp as auth_bp
    app.register_blueprint(auth_bp)
    
    from .blueprints.api import bp as api_bp
    app.register_blueprint(api_bp)


    return app