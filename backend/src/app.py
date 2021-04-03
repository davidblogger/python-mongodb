from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

#Inicializar flask
app = Flask(__name__)

#Conectar MongoDB
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreactdb'
#Requerir mongodb
mongo = PyMongo(app)

'''Interactuar el server de python con el de reactjs,
se utiliza CORS'''
CORS(app)

#Vamos a guardar en una variable la definicion de usuarios a la base
#de datos
db = mongo.db.users

#Rutas de la aplicacion
@app.route('/users', methods=['POST'])
#Crear usuarios
def createUser():
	id = db.insert({
		'name': request.json['name'],
		'email': request.json['email'],
		'password': request.json['password']
	})
	return jsonify(str(ObjectId(id)))

#Listar usuarios
@app.route('/users', methods=['GET'])
def getUsers():
	#Llevar los datos a una lista
	users = []
	for doc in db.find():
		users.append({
			'id': str(ObjectId(doc['_id'])),
			'name': doc['name'],
			'email': doc['email'],
			'password': doc['password']
		})
	return jsonify(users)

#Listar usuario por id
@app.route('/user/<id>', methods=['GET'])
def getUser(id):
	user = db.find_one({'_id': ObjectId(id)})
	print(user)
	return jsonify({
		'_id': str(ObjectId(user['_id'])),
		'name': user['name'],
		'email': user['email'],
		'password': user['password']
	})

#Borrando un usuario
@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
	db.delete_one({'_id': ObjectId(id)})
	return jsonify({'msg': 'User delete'})

#Actualizar usuario
@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
	db.update_one({'_id': ObjectId(id)}, {'$set':{
		'name': request.json['name'],
		'email': request.json['email'],
		'password': request.json['password']
	}})
	return jsonify({'msg': 'User updated'})

#Inicializar el paquete
if __name__ == '__main__':
	app.run(debug=True)

