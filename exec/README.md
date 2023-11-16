# **맘스픽 포팅 메뉴얼**

## **컨테이너 이미지**

- 엘라스틱 서치: docker.elastic.co/elasticsearch/elasticsearch:7.16.2

## **배포**

1. S09P31C202/workspace로 exec에 있는 도커 컴포즈 파일 이동

2. mpick_network으로 네트워크 생성

3. 엘라스틱 서치 이미지를 컨테이너를 실행시킨다.

```json
docker run -d --name elasticsearch -p 9200:9200 -v elasticsearch-volume:/usr/share/elasticsearch/data —network mpick_network -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.16.2
```

4. 엘라스틱 서치 컨테이너에 들어가서 노리 플러그인을 설치 후 엘라스틱 서치를 재시작 한다.

```json
elasticsearch-plugin install analysis-nori
```

5. 도커 컴포즈 업을 한다.

## **프로젝트 종속성**

- Spring Boot: 2.7.17
- Java: 11
- python: 3.9.13
- mysql: 8.0.34
- Next.js: 13.5.6
- Next-ui: 2.1.13
- react: 18.2.0
- [socket.io](http://socket.io/): 4.7.2
- react-daum-postcode: 3.1.3
- swiper: 11.0.3
- tailwindcss: 3.3.4
- typescript: 5.2.2
- zustand: 4.4.4