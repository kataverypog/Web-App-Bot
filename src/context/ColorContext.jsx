import {createContext} from "react";

export const ColorContext = createContext(null);

const ColorProvider = ({ children }) => {

    const tgTheme = window?.Telegram?.WebApp?.themeParams || {};
    const bgColor = tgTheme.bg_color || "#221e2a";
    const color = tgTheme.text_color || "#f5f5f5";
    const btnColor = tgTheme.button_color || "#917bbd";
    const btnText = tgTheme.button_text_color || "#ffffff";
    const hintColor = tgTheme.hint_color || "#857d95";
    const secondaryBG = tgTheme.secondary_bg_color || "#312b3a";
    const linkColor = tgTheme.link_color || "#b89ff2";

    return (
        <ColorContext.Provider
            value={{
                bgColor,
                color,
                btnColor,
                btnText,
                hintColor,
                secondaryBG,
                linkColor,
            }}
        >
            {children}
        </ColorContext.Provider>
    );
};

export default ColorProvider;