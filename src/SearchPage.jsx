import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import instance from './apis/axios';
import RecKeyWord from './components/recKeyWord';

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
					const SliceCache = (await cacheResponse.json()).slice(0, 9);
					setRes(SliceCache);
				} else {
					const cloneResponse = new Response(JSON.stringify(response.data));
					await cacheStorage.put(url, cloneResponse);
					setRes(response.data.slice(0, 9));
					console.log(res);
					console.info('calling api');
				}
			} catch (error) {
				console.error('Error while getting data from cache:', error);
			}
		}
	};

	return (
		<div>
			<Header />

			<div>
				<input
					type="text"
					placeholder="검색어를 입력하세요."
					value={input}
					onChange={inputOnChange}
				/>
				<button>검색</button>

				{input !== '' ? <RecKeyWord res={res} /> : null}
			</div>
		</div>
	);
}
export default SearchPage;
