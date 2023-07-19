import React from 'react';
import { styled } from 'styled-components';

function RecKeyWord({ res }) {
	return (
		<Ul>
			<SubTitle>추천검색어</SubTitle>

			{res.length === 0 ? (
				<Li none>검색어 없음</Li>
			) : (
				res.map(function (item, idx) {
					return <Li key={idx}>{item.sickNm}</Li>;
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
	padding: 20px 12px 0;
	font-size: 17px;
	color: ${({ focus }) => (focus ? '#357ae1' : 'black')};
	font-weight: ${({ focus }) => (focus ? 'bold' : 'normal')};

	${({ none }) => (none ? 'margin-left : 8px' : '')};
`;
