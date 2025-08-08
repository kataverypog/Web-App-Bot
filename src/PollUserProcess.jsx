import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

const PollUserProcess = () => {
    const { user, refreshUser } = useContext(UserContext);

    useEffect(() => {
        if (!user) return;

        const interval = setInterval(() => {
            refreshUser();
        }, 3000);

        return () => clearInterval(interval); // очистка
    }, [user?.id]);

    return null;
};

export default PollUserProcess;
