from fastapi import status


def test_register_and_login_flow(client) -> None:
    payload = {
        "email": "demo@example.com",
        "full_name": "Demo User",
        "password": "secret123",
    }

    response = client.post("/auth/register", json=payload)
    assert response.status_code == status.HTTP_201_CREATED
    body = response.json()
    assert body["email"] == payload["email"]

    login_response = client.post(
        "/auth/login",
        data={"username": payload["email"], "password": payload["password"]},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert login_response.status_code == status.HTTP_200_OK
    token = login_response.json()["access_token"]
    assert token
