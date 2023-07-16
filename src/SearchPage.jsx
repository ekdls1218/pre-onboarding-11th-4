import React from 'react';
import Header from './components/Header';

function SearchPage() {
	return (
		<div>
			<Header />

			<div>
				<input type="text" placeholder="검색어를 입력하세요." />
				<button>검색</button>
			</div>
		</div>
	);
}
export default SearchPage;
