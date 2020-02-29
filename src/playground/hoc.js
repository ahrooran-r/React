import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h3> info is working </h3>
        <p> The info is: {props.info}</p>
    </div>
);

// higher order component 1
const withAdminInfo = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <h1> Higher order component message </h1>}
            <WrappedComponent {...props}/>
        </div>
    );
};

// higher order component 2
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props}/> :
                <h1> Please login in order to view the files </h1>}
        </div>
    );
};

const AdminInfo = withAdminInfo(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info="these are the details"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="these are the details"/>,
    document.getElementById('app'));