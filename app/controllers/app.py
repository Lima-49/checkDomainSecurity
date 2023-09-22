
"""
The `verificar_dominio` function makes an API call to check the status of a domain and returns the
response as JSON.

:param dominio: The parameter "dominio" represents the domain name that you want to verify. It is
used as a parameter in the API call to check the status of the domain
:return: The function `verificar_dominio` returns a JSON response containing the data retrieved from
an external API if the API call is successful (status code 200). If there is an error in the API
call, it returns a JSON response with an error message and the corresponding status code. If there
is an exception during the API call, it returns a JSON response with the error message and a status
"""
from flask import Flask, jsonify
from flask_cors import CORS
import requests
from requests.exceptions import RequestException

API_URL = 'https://app.valimail.com/domain_checker/v1/status/'
app = Flask(__name__)
CORS(app)

@app.route('/api/verificar-dominio/<dominio>', methods=['GET'])
def verificar_dominio(dominio):
    """
    The function `verificar_dominio` makes an API call to
    check the status of a domain and returns the response as JSON.
    
    :param dominio: The parameter "dominio" represents the domain name that you want to verify.
    It is used as a parameter in the API call to check the status of the domain
    :return: The function `verificar_dominio` returns a JSON response containing the data retrieved
    from an external API if the API call is successful (status code 200).
    If there is an error in the API call, it returns a JSON response with an error message
    and the corresponding status code.
    If there is an exception during the API call, it returns a JSON
    response with the error message and a status
    """

    try:
        response = requests.get(f'{API_URL}{dominio}.json', timeout=10)

        if response.status_code == 200:
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({'error': 'Erro na chamada da API'}), response.status_code

    except RequestException as error:
        return jsonify({'error': str(error)}), 500

if __name__ == '__main__':
    app.run()
