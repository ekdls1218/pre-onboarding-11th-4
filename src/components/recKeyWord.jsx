import React from 'react';

function RecKeyWord({ res }) {
	return (
		<div>
			<p>추천검색어</p>

			{res.map(function (a, i) {
				return <div key={i}>{a.sickNm}</div>;
			})}
		</div>
	);
}
export default RecKeyWord;
