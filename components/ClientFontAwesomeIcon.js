import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClientFontAwesomeIcon = (props) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Don't render on the server
    }

    return <FontAwesomeIcon {...props} />;
};

export default ClientFontAwesomeIcon;