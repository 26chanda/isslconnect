import React from 'react';
import './ThankYouPage.css'; // Import the external CSS file

const ThankYouPage = () => {
    return (
        <div className="container">
            <h1>Thank You for Visiting</h1>
            <p>We hope to see you again soon!</p>
            <button onClick={() => window.location.href = 'index.html'}>
                Back to Homepage
            </button>
        </div>
    );
};

export default ThankYouPage;
