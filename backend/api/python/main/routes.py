from flask import current_app, Blueprint, json, render_template, send_file, jsonify, request
from api import db
#from flask_app.python.models import Pumps, PressureMonitor

main = Blueprint('main', __name__)

@main.route('/', methods=['GET', 'POST'])
def index():
    return "Hi"#render_template('index.html', title='Syringe Pumps')