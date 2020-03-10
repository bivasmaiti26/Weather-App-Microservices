docker network create --driver bridge blitzkrieg-default-network || true
docker-compose -f ./kafka-docker/docker-compose.yml up -d 
docker-compose -f ./APIGateway/docker-compose.yml up -d
docker-compose -f ./sessionmanagement/docker-compose.yml up -d
docker-compose -f ./user_management/docker-compose.yml up -d
docker-compose -f ./weather_service/docker-compose.yml up -d
docker-compose -f ./UI/docker-compose.yml up -d
