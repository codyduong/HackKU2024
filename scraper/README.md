This contains our scrapers for the website/DB.

## Developing
### Poetry
```
poetry install
poetry shell
python -m src.main
exit
```
If you are using VS code you can get the python executable location with
```
poetry env info
```

## Build
### Docker
```
docker -t <some-unique-tag> .
docker run <some-unique-tag>
```