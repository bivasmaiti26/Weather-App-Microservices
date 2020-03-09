docker-compose -f ./UI/docker-compose.yml down
docker-compose -f ./weather_service/docker-compose.yml down
docker-compose -f ./user_management/docker-compose.yml down
docker-compose -f ./APIGateway/docker-compose.yml down
docker-compose -f ./kafka-docker/docker-compose.yml down