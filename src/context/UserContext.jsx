import {createContext, useState} from "react";
import axios from "axios";

export const UserContext = createContext(null);

const api = "http://localhost:3000";

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [code, setCode] = useState("");
    const [polling, setPolling] = useState(false);

    const refreshUser = async () => {
        try {
            const response = await axios.get(`${api}/users/${user.id}`);
            setUser(response.data);
        } catch (error) {
            console.error("Ошибка обновления пользователя:", error);
        }
    };

    const fetchCode = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${id}`);
            setCode(response.data.init_code);
        } catch (e) {
            console.error("Ошибка при получении init_code", e);
        }
    };

    const startPollingCode = (id) => {
        if (polling || !id) return;

        setPolling(true);

        const poll = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/users/${id}`);
                const newCode = res.data.init_code;

                if (newCode && newCode.trim() !== "") {
                    setCode(newCode);
                    clearInterval(intervalId);
                    setPolling(false);
                }
            } catch (err) {
                console.error("Ошибка при опросе init_code", err);
            }
        };

        poll();

        const intervalId = setInterval(poll, 3000);
    };



    const deleteStreamer = async (id) => {
        try {
            const updatedStreamers = user.streamers.filter((s) => s.id !== id);

            await axios.patch(`${api}/users/${user.id}`, {
                streamers: updatedStreamers
            });

            refreshUser();
        } catch (error) {
            console.error("Ошибка удаления стримера:", error);
        }
    };

    const editStreamer = async (id, name) => {
        try {
            const updatedStreamers = user.streamers.map((s) =>
                s.id === id ? {...s, name} : s
            );

            await axios.patch(`${api}/users/${user.id}`, {
                streamers: updatedStreamers
            });

            refreshUser();
        } catch (error) {
            console.error("Ошибка редактирования:", error);
        }
    };

    const addStreamer = async (name) => {
        if (!name) return;

        const newStreamer = {
            id: String(Date.now()),
            name
        };

        try {
            const updatedStreamers = [...user.streamers, newStreamer];

            await axios.patch(`${api}/users/${user.id}`, {
                streamers: updatedStreamers
            });

            refreshUser();
        } catch (error) {
            console.error("Ошибка добавления:", error);
        }
    };

    const handleStart = async () => {
        try {
            const res = await fetch("http://localhost:4000/start-bot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: user.username })
            });

            if (!res.ok) {
                const text = await res.text();
                alert(`Ошибка запуска бота: ${text}`);
                return;
            }

            await fetch(`http://localhost:3000/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ process: true })
            });
        } catch (err) {
            console.error("Ошибка при запуске:", err);
        }
    };

    const handleStop = async () => {
        try {
            const res = await fetch("http://localhost:4000/stop-bot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: user.username })
            });

            if (!res.ok) {
                const text = await res.text();
                alert(`Ошибка остановки бота: ${text}`);
                return;
            }

            await fetch(`http://localhost:3000/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ process: false })
            });
        } catch (err) {
            console.error("Ошибка при остановке:", err);
        }
    };

    return (
        <UserContext.Provider
            value={{user, setUser, refreshUser, handleStop, handleStart, editStreamer, startPollingCode, addStreamer, deleteStreamer, code, fetchCode}}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
