import React from 'react';
class NotFound extends React.Component {
    render() {
        return (
            <div className="container text-center mt-4">
                <h4>Sorry, the page is not available.</h4>
                <a href="/" className="text-decoration-none text-dark">Go back to Instamini homepage</a>
            </div>
        );
    }
}

export default NotFound;