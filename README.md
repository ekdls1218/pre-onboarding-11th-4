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
  
   - [API 호출별로 로컬 캐싱 구현](#-api-호출별로-로컬-캐싱-구현)
     
   - [입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략](#-입력마다-api-호출하지-않도록-api-호출-횟수를-줄이는-전략)
     
   - [키보드만으로 추천 검색어들로 이동 가능하도록 구현](#-키보드만으로-추천-검색어들로-이동-가능하도록-구현)

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
- 질환명 검색시 API 호출 통해서 검색어 추천 기능을 구현
  - 검색어가 없을 시 “검색어 없음” 표출
  - 추천 검색어는 7개씩 표출

---

### 💡API 호출별로 로컬 캐싱 구현
- cacheStorage를 이용하여 캐싱 기능을 구현하였습니다.
```
const getSearch = async (input) => {
		const url = process.env.REACT_APP_API_BASE_URL + `?q=${input}`;
		if (input !== '') {
			const cacheStorage = await caches.open('keyword');
			const cacheResponse = await cacheStorage.match(url);
			try {
				if (cacheResponse) {
					const SliceCache = (await cacheResponse.json()).slice(0, 7);
					setRes(SliceCache);
				} else {
					const response = await instance.get(`?q=${input}`);
					console.info('calling api');
					const cloneResponse = new Response(JSON.stringify(response.data));
					await cacheStorage.put(url, cloneResponse);
					setRes(response.data.slice(0, 7));
				}
			} catch (error) {
				console.error('Error while getting data from cache:', error);
			}
		}
	};
   ```
- input에 값이 있을 때(검색할 때) 'keyword' 캐시 스토리지를 오픈하여 매치되는 결과가 있는지 확인해줍니다.
- input값의 데이터가 **캐시스토리지에 있다면 캐시스토리지에서 꺼내 보여주고** , 아니라면 **api를 호출**하여 'keyword' 캐시 스토리지에 데이터를 넣어줍니다.

---

### 💡입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 
- 검색어 추천 기능은 검색창에 검색어를 쓸 때마다 onChange 이벤트를 발생하게 되고, 이 이벤트가 발생할 때마다 api요청을 통해 관련 데이터를 보여주는 방법으로 구현하였습니다. 이 방법으로 구현하니 너무 많은 이벤트 발생으로 인한 api 요청으로 서버 과부하가 일어난다는 문제점이 나타났습니다. 그래서 저는 **Debouncing를 활용**하여 이 문제를 해결하였습니다.
- **Debouncing은 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것**으로 검색 기능에 자주 쓰입니다. 이번 과제에서 저는 **직접 구현하여 사용**하였습니다.
- API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정해주었습니다.
```
const inputOnChange = (e) => {
		setInput(e.target.value);
		printKeyWord(e.target.value);
		setFocusIdx(-1);
	};
```
```
const debounce = (callBack, delay) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => callBack(...args), delay);
	};
};
```
```
const printKeyWord = useCallback(
    debounce((input) => getSearch(input), 500),
    [],
);
```
- **debouncing을 활용**하여 inputOnChange 함수가 실행될 때 debounce 함수가 실행되어 **매번 getSearch(input) 함수가 실행되는 것이 아닌 0.5초 뒤에 실행된다.**
- debounce 함수는 컴포넌트가 리렌더링되면, printVlaue 재정의됩니다. 그걸 방지하기 위해 useCallBack()을 사용하였습니다. 

---

### 💡키보드만으로 추천 검색어들로 이동 가능하도록 구현
```
const [focusIdx, setFocusIdx] = useState(-1);

	const handleKeyDown = (e) => {
		const recLength = res.length;
		const maxList = 7;

		if (e.key === 'ArrowDown') {
			recLength > 0 && recLength < maxList
				? setFocusIdx((prev) => (prev + 1) % recLength)
				: setFocusIdx((prev) => (prev + 1) % maxList);
		}
		if (e.key === 'ArrowUp') {
			recLength > 0 && recLength < maxList
				? setFocusIdx((prev) => (prev - 1 + recLength) % recLength)
				: setFocusIdx((prev) => (prev - 1 + maxList) % maxList);
		}
		if (e.key === 'Escape') {
			setFocusIdx(-1);
		}
		if (e.key === 'Enter') {
			recLength > 0 && focusIdx >= 0 && setInput(res[focusIdx]['sickNm']);
		}
	};
```
- input창의 onKeyDown이벤트를 사용하여 위 방향키, 아래 방향키, Esc, Enter 키를 눌렀을 때 setFocusIdx를 설정해주도록 하여 키보드로 추천 검색어를 이동할 수 있도록 해주었습니다. Enter 키를 눌렀을 때는 선택한 값이 검색창에 보이도록 해주었습니다.
