import React, {useContext, useState} from 'react';
import {UserContext} from "../context/UserContext";
import {ColorContext} from "../context/ColorContext";

const AddStreamer = () => {
    const {bgColor, btnColor, secondaryBG, color, hintColor} = useContext(ColorContext);
    const {addStreamer} = useContext(UserContext);
    const [showAddInput, setShowAddInput] = useState(false);
    const [newStreamer, setNewStreamer] = useState("");

    const handleAddStreamer = () => {
        addStreamer(newStreamer);
        setNewStreamer("");
    };

    return (
        <div className="mb-4">
            {!showAddInput ? (
                <div style={{backgroundColor: btnColor, paddingBlock: "4px", borderRadius: "10px"}} onClick={() => setShowAddInput(true)}>
                    <button
                        className="px-3 py-2 rounded flex gap-2"
                    >
                        <svg viewBox="0 0 24 24" width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z"
                                    fill={color}></path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                                      fill={color}></path>
                            </g>
                        </svg>
                        <span>Add Streamer</span>
                    </button>
                </div>
            ) : (
                <div className="flex justify-between items-center" style={{
                    backgroundColor: secondaryBG, padding: "12px",
                    borderRadius: "10px"
                }}>
                    <input
                        type="text"
                        placeholder="Streamer name"
                        value={newStreamer}
                        onChange={(e) => setNewStreamer(e.target.value)}
                        style={{backgroundColor: secondaryBG, color, border: `1px solid ${hintColor}`}}
                        className="p-0.5 rounded"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddStreamer}
                            className="p-0.5 rounded-full"
                            style={{backgroundColor: bgColor}}>
                            <svg viewBox="0 0 24 24" width="23" height="23" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                   stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g id="Interface / Check">
                                        <path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732"
                                              stroke={btnColor} stroke-width="2" stroke-linecap="round"
                                              stroke-linejoin="round"></path>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <button
                            onClick={() => {
                                setShowAddInput(false);
                                setNewStreamer("");
                            }}
                            className="p-1 rounded-full"
                            style={{backgroundColor: bgColor}}>
                            <svg viewBox="0 0 512 512" width="19" height="19" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill={btnColor}>
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"><title>cancel</title>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="work-case" fill={btnColor} transform="translate(91.520000, 91.520000)">
                                            <polygon id="Close"
                                                     points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"></polygon>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddStreamer;