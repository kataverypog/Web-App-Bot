import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import {BrowserRouter} from "react-router-dom";
import ColorProvider from "./context/ColorContext";
import UserProvider from "./context/UserContext";
import PollUserProcess from "./PollUserProcess";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <ColorProvider>
            <UserProvider>
                <PollUserProcess />
                <App/>
            </UserProvider>
        </ColorProvider>
    </BrowserRouter>
);
