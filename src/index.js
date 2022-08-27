import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// import Messages from './Messages';
// import Login from './Login';
import Frontpage from './Frontpage';
import Messages from './Messages';
import Login from './Login';

import Layout from './Layout';

import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(    
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Frontpage />} />
                <Route path="messages" element={<Messages />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Frontpage />} />
            </Route>
        </Routes>
    </BrowserRouter>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


