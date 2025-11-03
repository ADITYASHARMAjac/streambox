# StreamBox Sample Videos

Place your MP4 (or WebM/MKV) assets in this directory so the `/stream/{movie_id}/video` endpoint can serve them.

## Naming conventions

When StreamBox receives a playback request, it looks for files in the following order:

1. `movie-<id>.mp4` (for example `movie-1.mp4` for "Stranger Worlds")
2. `movie-<id>.webm`
3. `movie-<id>.mkv`
4. `<slug>.mp4` where `<slug>` is the lowercase title with spaces replaced by dashes (e.g. `stranger-worlds.mp4`)
5. The same slug with `.webm` or `.mkv`
6. `<id>.mp4` (e.g. `1.mp4`) and the equivalent `.webm`/`.mkv`

Drop at least one matching file for each movie, restart the backend (`uvicorn backend.app.main:app`) and the video player will stream it with HTTP range support.

> Tip: it's perfectly fine to reuse the same sample video for multiple titles—just copy it under the expected filenames.
