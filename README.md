# 4주차 과제
## 목표
    검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

## 배포 링크

## 실행 방법
1. 명령어를 사용해서 로컬 환경으로 복사본을 가져옵니다.
   
    `git clone https://github.com/ekdls1218/pre-onboarding-11th-4.git`

3. 가져온 복사본으로 이동합니다.
    
    `cd pre-onboarding-11th-4`

4. 가져온 프로젝트의 종속성을 설치하세요.

    `npm install`
   
5. 이 프로젝트는 '.env'를 사용합니다. 다음 단계를 따라 .env를 설정해 주세요.

    -  루트 디렉토리에 '.env'파일을 생성 합니다.
    -  텍스트 편집기로 '.env' 파일을 엽니다.
    -  '.env' 파일에 다음 변수와 해당하는 값을 입력하세요.
       `REACT_APP_API_BASE_URL = "http://localhost:4000/sick"`

6. 설치가 완료되었고, .env 설정이 완료 되었다면 다음 명령어로 프로젝트를 실행할 수 있습니다.
    
    `npm start`

## 기술 스택
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/> <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black"/> <img src="https://img.shields.io/badge/Husky-red?style=flat-square&logo=&logoColor=black"/> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=&logoColor=black"/>

## 목차
- [파일 구조](#파일-구조)
- [기능 구현 및 전략](#기능-구현-및-전략)
   - [입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략](#입력마다-api-호출하지-않도록-api-호출-횟수를-줄이는-전략)
   - [API 호출별로 로컬 캐싱 구현](#api-호출별로-로컬-캐싱-구현)
   - [키보드만으로 추천 검색어들로 이동 가능하도록 구현](#키보드만으로-추천-검색어들로-이동-가능하도록-구현)

## 파일 구조
```
📦src
 ┣ 📂apis
 ┃ ┗ 📜axios.js
 ┣ 📂components
 ┃ ┣ 📜Header.jsx
 ┃ ┗ 📜recKeyWord.jsx
 ┣ 📜GlobalStyle.jsx
 ┣ 📜index.jsx
 ┣ 📜router.jsx
 ┗ 📜SearchPage.jsx
```

## 기능 구현 및 전략
#### 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략


#### API 호출별로 로컬 캐싱 구현


#### 키보드만으로 추천 검색어들로 이동 가능하도록 구현


