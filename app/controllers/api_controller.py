# app/controllers/api_controller.py
from flask import Blueprint, request, jsonify
import requests

api_controller = Blueprint('api_controller', __name__)

@api_controller.route('/api/verificar-dominio/<dominio>', methods=['GET'])
def verificar_dominio(dominio):
    try:
        # Faça a chamada de API externa
        headers_list = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }

        response = requests.get(f'https://app.valimail.com/domain_checker/v1/status/{dominio}.json', headers=headers_list, timeout=10)

        if response.status_code == 200:
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({'error': 'Erro na chamada da API'}), response.status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500
