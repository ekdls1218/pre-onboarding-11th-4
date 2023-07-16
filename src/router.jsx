import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SearchPage from './SearchPage';

const route = [
	{
		path: '',
		element: <SearchPage />,
		errorElement: <div>error</div>,
	},
];

const router = createBrowserRouter(route);

export default router;
