from fastapi import status


def test_list_movies(client) -> None:
    response = client.get("/movies")
    assert response.status_code == status.HTTP_200_OK
    body = response.json()
    assert "items" in body
    assert len(body["items"]) >= 1


def test_get_movie_detail(client) -> None:
    movie_id = 1
    response = client.get(f"/movies/{movie_id}")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == movie_id


def test_streaming_returns_404_when_asset_missing(client) -> None:
    response = client.get("/stream/1/video")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    body = response.json()
    assert "detail" in body
