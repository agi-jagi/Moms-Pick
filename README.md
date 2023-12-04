#  소개

## 프로젝트 소개

- 프로젝트명: 맘스픽(육아용품 중고거래 플랫폼)

- 프로젝트 기간: 2023-10-10 ~ 2023-11-17

- 주요 기능
    - 사용자 위치 기반 중고 육아용품 거래 기능
    - 판매자와 구매자 간 실시간 채팅 기능 
    - 육아 정보 제공 

- 참조 리소스
    - 당근마켓
    - 맘맘
  

## 맘스픽
<div align=center>
  <img src="readme_assets/logo.png" height="400" width="400" />
  <h3>맘스픽 Logo</p>
</div>

## 화면 내용
|1-1. 로그인|1-2. 회원가입|
|:---:|:---:|
|![proc1-2](/readme_assets/C202%20시연%20시나리오_page-0001.jpg)|![proc1-3](/readme_assets/C202%20시연%20시나리오_page-0002.jpg)|



|2. 메인페이지 |3. 검색 & 필터링|
|:---:|:---:|
|![proc4](/readme_assets/C202%20시연%20시나리오_page-0005.jpg)|![proc5](/readme_assets/C202%20시연%20시나리오_page-0006.jpg)|


|4. 상세페이지|5. 채팅|
|:---:|:---:|
|![proc-end](/readme_assets/C202%20시연%20시나리오_page-0007.jpg)|![modal](/readme_assets/C202%20시연%20시나리오_page-0008.jpg)|

|6-1. 육아정보|6-2. 육아정보|
|:---:|:---:|
|![proc-end](/readme_assets/C202%20시연%20시나리오_page-0009.jpg)|![modal](/readme_assets/C202%20시연%20시나리오_page-0010.jpg)|

|7-1. 마이페이지|7-2. 마이페이지|
|:---:|:---:|
|![proc-end](/readme_assets/C202%20시연%20시나리오_page-0011.jpg)|![modal](/readme_assets/C202%20시연%20시나리오_page-0012.jpg)|


## 팀원 소개

<table align="center">
    <tr align="center">
        <td>
            팀장/Backend/infra
        </td>
        <td>
            Backend/infra
        </td>
        <td>
            Backend/Data
        </td>
        <td>
            Frontend
        </td>
        <td>
            Frontend
        </td>
        <td>
            Frontend
        </td>
    </tr>
    <tr align="center">
     <td style="min-width: 150px;">
            <a href="https://github.com/wnsdlf925">
              <img src="https://avatars.githubusercontent.com/u/62425882?v=4" width="200">
              <br />
              <b>wnsdlf925</b>
            </a> 
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/ji-hyon">
              <img src="https://avatars.githubusercontent.com/u/120673992?v=4" width="200">
              <br />
              <b>ji-hyon</b>
            </a>
        </td>
         <td style="min-width: 150px;">
            <a href="https://github.com/jhy1812">
              <img src="https://avatars.githubusercontent.com/u/122588619?v=4" width="200">
              <br />
              <b>jhy1812</b>
            </a> 
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/JeBread">
              <img src="https://avatars.githubusercontent.com/u/108921478?v=4" width="200">
              <br />
              <b>JeBread</b>
            </a> 
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/cjjss11">
              <img src="https://avatars.githubusercontent.com/u/122518199?v=4" width="200">
              <br />
              <b>cjjss11</b>
            </a> 
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/ChoiCharles">
              <img src="https://avatars.githubusercontent.com/u/122588654?v=4" width="200">
              <br />
              <b>ChoiCharles</b>
            </a> 
        </td>
    </tr>
    <tr align="center">
        <td>
            권준일
        </td>
        <td>
            서지현
        </td>
        <td>
            정호윤
        </td>
        <td>
            방상제
        </td>
        <td>
            최지수
        </td>
        <td>
            최찬석
        </td>
    </tr>
</table>

### 담당 업무  

🙋🏻‍♂️ 권준일  

- 데이터베이스 스키마 설계
- CI/CD를 위한 젠킨스 파이프라인 구축
- 배포를 위한 인프라 구축
- 아기관련 API 개발
- 사용자 위치를 기반으로 거리별 물품 목록 조회 기능 개발
- ElasticSearch를 이용하여 검색 기능 개발
  
🙋🏻‍♂️ 서지현 

- 데이터베이스 스키마 설계
- 배포를 위한 인프라 구축
- 회원 도메인 기능 구현
- WebSocket을 활용한 실시간 채팅 기능 구현

🙋🏻‍♂️ 정호윤  

- 데이터베이스 스키마 설계
- 추천기능 개발
- 데이터 처리
- 게시판 API 개발

🙋🏻‍♂️ 방상제  

- Figma 화면 설계 및 제작 ( 거래 화면, 검색 및 필터링 페이지, 판매글 상세 페이지 )
- Zustand 상태 관리 스토어 생성 with Next.js 13
- 판매글 추천 목록 조회 - swiper
- 판매글 등록 기능
- 판매글 필터링 ( 대분류, 중분류, 개월 중복 선택 ) - Elastic Search 에 query 요청
- 판매글 제목 검색 - Elastic Search 에 query 요청
- 설정 반경에 해당하는 판매글 목록 조회
- 판매글 상세 조회
- 판매글 찜 기능
- 형상 관리 ( Jira ) 

🙋🏻‍♂️ 최지수  

- 회원가입 페이지 구현
- 마이페이지 구현
- 아기정보관련 공공API를 이용하여 정보 페이지 구현 

🙋🏻‍♂️ 최찬석  

- 거리 변경 페이지 제작
- 주소 설정기능 구현
- 카카오맵 API를 이용하여 주소관련 기능 구현 
- 형상 관리 ( Jira ) 


## 사용 기술  

- Java
- Spring Boot
- FastAPI
- JPA
- QueryDsl
- ElasticSearch
- MySql
- Redis
- React
- Next.js
 
