# AllMusic Player
Stream music from different plattforms and create playlists

## README
- Jannik Lorenz
- Simon Binder
- Tim Tenckhoff


## compile and run docker files

- docker-compose build 
- docker-compose up -d mongo
- docker-compose up -d backend
- docker-compose up -d frontend




## run tests

- docker-compose up backend-test (execute after mongo container is running)
- docker-compose up frontend-test


## docker
for windows volumes might have to be created via `docker volume create --name=<volumename>`
