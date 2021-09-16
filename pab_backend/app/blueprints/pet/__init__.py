from flask import Blueprint

bp = Blueprint('like',__name__, url_prefix='')

from .import models