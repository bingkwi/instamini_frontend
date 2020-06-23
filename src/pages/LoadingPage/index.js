import React, { Component } from 'react';

class LoadingPage extends Component {
    render() {
        return (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center" style={{ width: '100vw', height: '100vh' }}>
                <img className="d-flex" src="./loading.svg" alt="spinning" />
            </div>
        );
    }
}

export default LoadingPage;