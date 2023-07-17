import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import instance from './apis/axios';
import RecKeyWord from './components/recKeyWord';

function SearchPage() {
	const [input, setInput] = useState('');
	const [res, setRes] = useState([]);
	//console.log(`?q=${input}`)

	const getSearch = async () => {
		const response = await instance.get(`?q=${input}`);
		setRes(response.data);
		return console.log(res);
	};

	useEffect(() => {
		getSearch();
	}, [input]);
	//console.log(input)

	const inputOnChange = (e) => {
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
