import React from 'react';
import { styled } from 'styled-components';

function Header() {
	return (
		<>
			<MainTitle>국내 모든 임상시험 검색하고 온라인으로 참여하기</MainTitle>
		</>
	);
}
export default Header;

const MainTitle = styled.h2`
	font-size: 26px;
	font-weight: 900;
	width: 360px;
	text-align: center;
	line-height: 40px;
	margin-top: 20px;
`;
