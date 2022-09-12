import React from 'react';

import { Navigate } from 'react-router-dom';

import { useIsAuthenticated } from '@azure/msal-react';

const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useIsAuthenticated();
	if (isAuthenticated) {
		return children;
	}

	return <Navigate to='/' />;
};

export default ProtectedRoute;
