FROM adoptopenjdk/openjdk11
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} mpick-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/mpick-0.0.1-SNAPSHOT.jar"]
