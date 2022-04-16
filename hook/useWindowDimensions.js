import {useEffect, useState} from 'react';
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    document.documentElement.style.setProperty("--vh", height*0.01+"px");
    document.documentElement.style.setProperty("--vw", width*0.01+"px");
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}