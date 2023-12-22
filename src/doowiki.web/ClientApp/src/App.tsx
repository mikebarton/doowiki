import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Layout from './layouts/Layout';
import Home from './pages/Home/Home';
import Edit from './pages/Edit/Edit';
import NavMenuLayout from './layouts/NavMenuLayout';
import { GlobalContextProvider } from './utils/GlobalContextProvider';
import Admin from './pages/Admin/Admin';
import ColorModeProvider from './utils/ColorModeProvider';
import {globalStyles} from './themes/index';

function App() {
    globalStyles();
    

    return (
        <div id="container">
            <ColorModeProvider>
                <GlobalContextProvider defaultSpaceId={undefined} defaultUserId={undefined}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Login />} />
                            </Route>
                            <Route path={'Home'} element={<NavMenuLayout />} >
                                <Route path={':id'} element={<Home />} />
                                <Route path="*" element={<Home />} />
                            </Route>
                            <Route path='Edit' element={<NavMenuLayout />}>
                                <Route index element={<Edit />} />
                                <Route path=":id" element={<Edit />} />
                            </Route>
                            <Route path='Admin' element={<NavMenuLayout />}>
                                <Route index element={<Admin />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </GlobalContextProvider>
            </ColorModeProvider>
        </div>
    );
}

export default App;
