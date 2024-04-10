"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)



# Allow CORS requests to this API
CORS(api)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)





@api.route("/sign_up", methods=["POST"])
def create_sign_up():
    
    
   
     data = request.get_json()
     
     password = data.get("password", None)
     passwordConfirmation = data.get("passwordConfirmation", None)
     
     if not 'email' in data:
        return jsonify({"error": "Rellena el e-mail"}), 400
   



     if not('password' in data) or not('passwordConfirmation' in data):
        return jsonify({"error": "The password or password confirmation is not present"}), 400
   

     if password != passwordConfirmation:
        return jsonify({"error": "Please verify that password is equal to your password confirmation field"}), 400
  
 
     new_user = User(
        email= data['email'],
        password= data['password'],
        passwordConfirmation= data['passwordConfirmation']
)
     db.session.add(new_user)
     db.session.commit()

     response_body = {
         "message": "El usuario se ha creado correctamente"
     }   
     return jsonify(response_body), 200
     
     
 

     
     
     
     
     
     
     