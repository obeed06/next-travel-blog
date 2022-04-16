import { useEffect } from "react";
import { useLocation } from "react-router";

const RouterScrollToTop = (props) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>
};

export default RouterScrollToTop;