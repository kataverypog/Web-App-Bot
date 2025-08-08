import React, { useState, useContext } from "react";
import { ColorContext } from "./context/ColorContext";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const { bgColor, color, secondaryBG, linkColor, hintColor } = useContext(ColorContext);
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:10001/users?username=${username}`);
            const data = await res.json();

            if (data.length > 0) {
                setUser(data[0]);
                navigate("/list");
            } else {
                const tg = window.Telegram.WebApp;
                const chat_id = tg?.initDataUnsafe?.user?.id || null;

                const newUser = {
                    username,
                    chat_id,
                    init_code: "",
                    process: false,
                    streamers: []
                };

                const createRes = await fetch("http://localhost:10001/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                });

                if (createRes.ok) {
                    const createdUser = await createRes.json();
                    setUser(createdUser);
                    navigate("/list");
                } else {
                    console.error("Ошибка при создании пользователя");
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: bgColor, color }}
        >
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm p-6 rounded-xl shadow-lg"
                style={{ backgroundColor: secondaryBG }}
            >
                <h2 className="text-xl font-bold mb-6 text-center">Login Form</h2>

                <div>
                    <label className="text-sm" style={{ color: hintColor }}>
                        Twitch username
                    </label>
                    <input
                        type="text"
                        placeholder="Kappa"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mb-1 p-2 border rounded"
                        style={{ backgroundColor: secondaryBG, color }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 rounded font-semibold mt-4"
                    style={{ backgroundColor: linkColor }}
                >
                    Confirm
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
