import React from 'react';
import {Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm";
import StreamerList from "./streamer/StreamerList";
import TwitchConnection from "./TwitchConnection";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/list" element={<StreamerList />} />
            <Route path="/connection" element={<TwitchConnection />} />
        </Routes>
    );
};

export default App;