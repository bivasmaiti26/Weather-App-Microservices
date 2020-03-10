FROM maven
WORKDIR /session-management
COPY . .
EXPOSE 8084
RUN mvn clean install
CMD ["mvn","spring-boot:run"]
