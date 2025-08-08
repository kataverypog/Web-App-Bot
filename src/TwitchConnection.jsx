import React, { useContext, useEffect } from 'react';
import CopyInput from "./CopyInput";
import { UserContext } from "./context/UserContext";
import { ColorContext } from "./context/ColorContext";

const TwitchConnection = () => {
    const { bgColor, color, secondaryBG, linkColor } = useContext(ColorContext);
    const { code, user, startPollingCode } = useContext(UserContext);

    useEffect(() => {
        if (user?.id) {
            startPollingCode(user.id);
        }
    }, [user]);

    const handleSubmit = () => {
        window.open("https://www.twitch.tv/activate", "_blank");
    };


    if (!user) return null;

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: bgColor, color }}
        >
            <div
                className="w-full max-w-sm p-6 rounded-xl shadow-lg"
                style={{ backgroundColor: secondaryBG }}
            >
                <h2 className="text-xl font-bold mb-6 text-center">Hello {user.username}</h2>

                <div>
                    {code?.trim()
                        ? <CopyInput code={code} />
                        : <p className="text-center">Waiting for code...</p>}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full p-2 rounded font-semibold mt-4"
                    style={{ backgroundColor: linkColor }}
                >
                    Connect
                </button>
            </div>
        </div>
    );
};

export default TwitchConnection;
