docker-compose -f ./kafka-docker/docker-compose.yml build --no-cache
docker-compose -f ./APIGateway/docker-compose.yml build --no-cache
docker-compose -f ./user_management/docker-compose.yml build --no-cache
docker-compose -f ./weather_service/docker-compose.yml build --no-cache
docker-compose -f ./UI/docker-compose.yml build --no-cache

