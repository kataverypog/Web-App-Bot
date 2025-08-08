import React, {useContext} from 'react';
import {ColorContext} from "../context/ColorContext";
import {UserContext} from "../context/UserContext";

const DeleteStreamer = ({id}) => {
    const {bgColor, btnColor} = useContext(ColorContext);
    const {deleteStreamer} = useContext(UserContext);

    return (
        <button onClick={() => deleteStreamer(id)} className="p-1 rounded-full" style={{backgroundColor: bgColor}}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <g id="SVGRepo_iconCarrier">
                    <path d="M10 12V17" stroke={btnColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 12V17" stroke={btnColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 7H20" stroke={btnColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                          stroke={btnColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                          stroke={btnColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
            </svg>
        </button>
    );
};

export default DeleteStreamer;