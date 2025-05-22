import os
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def run_tests():
    # Test health endpoint
    response = client.get('/health')
    assert response.status_code == 200
    print('✅ Health check passed')

    # Test root endpoint
    response = client.get('/')
    assert response.status_code == 200
    print('✅ Root endpoint passed')

if __name__ == '__main__':
    run_tests()
