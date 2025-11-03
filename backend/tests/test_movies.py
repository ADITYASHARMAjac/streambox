from fastapi import status

from app import streaming


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


def test_streaming_serves_existing_asset(client) -> None:
    response = client.get("/stream/1/video", headers={"Range": "bytes=0-1023"})
    assert response.status_code == status.HTTP_206_PARTIAL_CONTENT
    assert response.headers["content-type"].startswith("video/")
    assert response.headers["accept-ranges"] == "bytes"


def test_streaming_returns_404_when_asset_missing(client, monkeypatch, tmp_path) -> None:
    def fake_available_dirs() -> list[object]:
        return [tmp_path]

    monkeypatch.setattr(streaming, "_available_video_dirs", fake_available_dirs)

    response = client.get("/stream/1/video")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    body = response.json()
    assert "detail" in body


def test_streaming_returns_404_for_unknown_movie(client) -> None:
    response = client.get("/stream/999999/video")
    assert response.status_code == status.HTTP_404_NOT_FOUND
