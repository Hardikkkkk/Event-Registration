from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail

mail = Mail()


cors = CORS()

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
