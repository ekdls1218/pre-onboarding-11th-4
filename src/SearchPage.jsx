import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import instance from './apis/axios';
import RecKeyWord from './components/recKeyWord';
import { styled } from 'styled-components';

function SearchPage() {
	const [input, setInput] = useState('');
	const [res, setRes] = useState([]);
	console.log(res);

	const inputOnChange = (e) => {
		setInput(e.target.value);
		printKeyWord(e.target.value);
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
			// setRes(response.data);
			// console.info('calling api');
			const cacheStorage = await caches.open('keyword');
			const cacheResponse = await cacheStorage.match(url);
			try {
				if (cacheResponse) {
					//console.log(await cacheResponse.json())
					const SliceCache = (await cacheResponse.json()).slice(0, 7);
					setRes(SliceCache);
				} else {
					const cloneResponse = new Response(JSON.stringify(response.data));
					await cacheStorage.put(url, cloneResponse);
					setRes(response.data.slice(0, 7));
					console.log(res);
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
				/>
				<SearchBtn>검색</SearchBtn>
			</SearchBar>

			{input !== '' ? <RecKeyWord res={res} /> : null}
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
	padding-left: 60px;
	background-color: #fff;
`;

const SearchBtn = styled.button`
	color: white;
	background-color: #357ae1;
	width: 80px;
	font-weight: bold;
	border-radius: 0 30px 30px 0;
`;
