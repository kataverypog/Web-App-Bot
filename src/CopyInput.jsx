import React, {useContext, useState} from "react";
import {ColorContext} from "./context/ColorContext";

const CopyInput = ({code = "ABCD1234"}) => {
    const {color, secondaryBG, hintColor} = useContext(ColorContext);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <div className="mb-6">
            <label className="text-sm block" style={{color: hintColor}}>Copy code</label>
            <div className="relative flex items-center">
                <input
                    type="text"
                    readOnly
                    value={code}
                    className="w-full pr-10 p-2 border rounded"
                    style={{backgroundColor: secondaryBG, color}}
                />
                <button
                    onClick={handleCopy}
                    className="absolute text-lg right-2 hover:underline"
                    title="Copy"
                >
                    {copied ? "✓" :
                        <svg viewBox="0 0 24 24" width="20" height="20"
                             transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
                                      fill={color}></path>
                                <path
                                    d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
                                    fill={color}></path>
                            </g>
                        </svg>}
                </button>
            </div>
        </div>
    );
};

export default CopyInput;
