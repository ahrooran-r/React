import React from 'react';
import {Link} from "react-router-dom";

const NotFoundPage = () => (
    <div>
        <h1>404!</h1>
        <h2>Page Not Found - <Link to="/">GO BACK HOME</Link></h2>
    </div>
);

export default NotFoundPage;