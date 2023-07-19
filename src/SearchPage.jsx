import React, { useCallback, useState } from 'react';
import Header from './components/Header';
import instance from './apis/axios';
import RecKeyWord from './components/recKeyWord';
import { styled } from 'styled-components';

function SearchPage() {
	const [input, setInput] = useState('');
	const [res, setRes] = useState([]);
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

	const inputOnChange = (e) => {
		setInput(e.target.value);
		printKeyWord(e.target.value);
		setFocusIdx(-1);
	};

	const debounce = (callBack, delay) => {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => callBack(...args), delay);
		};
	};

	const printKeyWord = useCallback(
		debounce((input) => getSearch(input), 500),
		[],
	);

	const getSearch = async (input) => {
		const url = process.env.REACT_APP_API_BASE_URL + `?q=${input}`;
		if (input !== '') {
			const response = await instance.get(`?q=${input}`);
			const cacheStorage = await caches.open('keyword');
			const cacheResponse = await cacheStorage.match(url);
			try {
				if (cacheResponse) {
					const SliceCache = (await cacheResponse.json()).slice(0, 7);
					setRes(SliceCache);
				} else {
					const cloneResponse = new Response(JSON.stringify(response.data));
					await cacheStorage.put(url, cloneResponse);
					setRes(response.data.slice(0, 7));
					console.info('calling api');
				}
			} catch (error) {
				console.error('Error while getting data from cache:', error);
			}
		}
	};

	return (
		<Container>
			<Header />

			<SearchBar>
				<SearchInput
					type="text"
					placeholder="검색어를 입력하세요."
					value={input}
					onChange={inputOnChange}
					onKeyDown={handleKeyDown}
				/>
				<SearchBtn>검색</SearchBtn>
			</SearchBar>

			{input !== '' ? <RecKeyWord res={res} focusIdx={focusIdx} /> : null}
		</Container>
	);
}
export default SearchPage;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #d0e8fd;
	width: 80%;
	height: 550px;
	border-radius: 10px;
	margin: 20px auto;
`;

const SearchBar = styled.div`
	position: relative;
	display: flex;
	margin: 20px 0 10px;
`;

const SearchInput = styled.input`
	font-size: 18px;
	width: 400px;
	height: 50px;
	border-radius: 30px 0 0 30px;
	padding-left: 30px;
	background-color: #fff;
`;

const SearchBtn = styled.button`
	color: white;
	background-color: #357ae1;
	width: 80px;
	font-weight: bold;
	border-radius: 0 30px 30px 0;
`;
