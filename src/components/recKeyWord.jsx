import React, { useState } from 'react';
import { styled } from 'styled-components';

function RecKeyWord({ res, focusIdx }) {
	return (
		<Ul>
			<SubTitle>추천검색어</SubTitle>

			{res.length === 0 ? (
				<Li none>검색어 없음</Li>
			) : (
				res.map(function (item, idx) {
					return (
						<Li key={idx} focus={focusIdx === idx}>
							{item.sickNm}
						</Li>
					);
				})
			)}
		</Ul>
	);
}

export default RecKeyWord;

const Ul = styled.ul`
	position: relative;
	border-radius: 15px;
	padding: 20px 0 30px;
	margin-bottom: 30px;
	width: 550px;
	background-color: white;
`;

const SubTitle = styled.div`
	color: gray;
	font-size: 11px;
	margin: 10px 20px 0px;
`;

const Li = styled.li`
	list-style: none;
	padding: 10px 12px 10px;
	font-size: 17px;
	background-color: ${({ focus }) => (focus ? '#dee2e6' : 'white')};

	${({ none }) => (none ? 'margin-left : 8px' : '')};
`;
