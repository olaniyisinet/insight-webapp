import React, {useEffect} from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import DashboardPage from '../pages/dashboard/DashboardPage';
import UserProfilePage from '../pages/profile/UserProfilePage';
import PPAPage from '../pages/ppa/PPAPage';
import AssetsPage from '../pages/assets/AssetsPage';
import AssetsPPAPage from '../pages/assets-ppa/AssetsPPAPage';

const AuthedAppRoutes = ({path}) => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate(path);
    }, [path]);

    return (
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="ppa-kpi" element={<PPAPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path='assets' element={<AssetsPage />} />
          <Route path='assets-ppa' element={<AssetsPPAPage />} />
        </Routes>
    );
};

export default AuthedAppRoutes;