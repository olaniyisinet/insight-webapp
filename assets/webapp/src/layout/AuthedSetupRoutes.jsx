import React, {useEffect} from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import UserSetupPage from '../pages/setup/UserSetupPage';

const AuthedAppRoutes = ({path}) => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate(path);
    }, [path]);

    return (
        <Routes>
          <Route path="/" element={<UserSetupPage />} />
        </Routes>
    );
};

export default AuthedAppRoutes;