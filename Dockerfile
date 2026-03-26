# Build stage
FROM maven:3.9.6-amazoncorretto-17 AS build
WORKDIR /app
COPY backend/pom.xml ./backend/
COPY backend/src ./backend/src
RUN mvn -f backend/pom.xml -DskipTests clean package -q

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/backend/target/resume-analyzer-backend-1.0.0.jar ./resume-analyzer-backend.jar
EXPOSE 8080
ENV JAVA_OPTS="-Xms256m -Xmx512m"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/resume-analyzer-backend.jar"]
