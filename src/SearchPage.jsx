import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import instance from './apis/axios';
import RecKeyWord from './components/recKeyWord';

function SearchPage() {
	const [input, setInput] = useState('');
	const [res, setRes] = useState([]);
	//console.log(`?q=${input}`)

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
		const response = await instance.get(`?q=${input}`);
		setRes(response.data);
		console.info('calling api');
	};

	const inputOnChange = (e) => {
		printKeyWord(e.target.value);
		setInput(e.target.value);
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

				<RecKeyWord res={res} />
			</div>
		</div>
	);
}
export default SearchPage;
