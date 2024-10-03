from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  
from os import environ

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
db = SQLAlchemy(app)

class User(db.Model):
  __tablename__ = "users"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(80), unique=True, nullable=False)
  password = db.Column(db.String(120), unique=True, nullable=False)
  
  def json(self):
    return {'id': self.id,'name': self.name, 'password': self.password}
  
db.create_all()

# cria login
@app.route('/api/flask/users/register', methods=['POST'])
def create_user():
  try:
    data = request.get_json()
    new_user = User(name=data['name'], password=data['password'])
    
    if User.query.filter_by(name=new_user.name).first():
      return make_response(jsonify({'message': 'este usuário já existe'}), 400)
    
    
    db.session.add(new_user)
    db.session.commit()  

    return jsonify({
        'id': new_user.id,
        'name': new_user.name,
        'password': new_user.password
    }), 201  

  except Exception as e:
    return make_response(jsonify({'message': 'erro ao criar o usuário', 'error': str(e)}), 500)
  
# verifica login
@app.route('/api/flask/users/login', methods=['POST'])
def login():
  try:
    data = request.get_json()
    name = data['name']
    password = data['password']
    
    user = User.query.filter_by(name=name).first()
    if user and (user.password == password):
      return make_response(jsonify({'message': 'login feito com sucesso'}), 200)
    else:
      return make_response(jsonify({'message': 'usuário ou senha incorretos'}), 401)
  except Exception as e:
    return make_response(jsonify({'message': 'erro', 'erro ao obter usuário': str(e)}), 500)
  
# if __name__ == '__main__':
#     app.run(debug=True)

 