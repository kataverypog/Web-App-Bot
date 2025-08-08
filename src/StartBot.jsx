import React, {useContext, useState} from 'react';
import {ColorContext} from "./context/ColorContext";

const StartBot = ({username}) => {
    const {color, linkColor} = useContext(ColorContext);
    const [error, setError] = useState("");

    const handleStart = async () => {
        try {
            const res = await fetch("http://localhost:4000/start-bot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username })
            });

            const text = await res.text();
            alert(text);
        } catch (err) {
            alert("Ошибка запуска бота");
            setError(err.message);
        }
    };

    return (
        <div
            style={{
                color,
                backgroundColor: linkColor,
                paddingBlock: "4px",
                bottom: 0,
                position: "fixed",
                width: "100%"
            }}
        >
            <button
                onClick={handleStart}
                className="px-3 py-2 rounded w-full flex justify-center"
            >
                Start
            </button>
            <p>{error}</p>
        </div>
    );
};

export default StartBot;
