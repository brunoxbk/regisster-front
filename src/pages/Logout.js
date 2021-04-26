import React, { useEffect } from 'react';
import { removeUserSession } from './../utils/common';

const Logout = (props) => {

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }

    useEffect(() => handleLogout(), []);

    return (
        <div>
            Goodbye!
        </div>
    );
}

export default Logout;