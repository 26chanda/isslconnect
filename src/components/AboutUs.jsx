import React, { useEffect, useState } from 'react';
import './styles2.css';

const AboutUsPage = () => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/about');
                const data = await response.json();
                setAboutData(data);
            } catch (error) {
                console.error('Error fetching About Us data:', error);
            }
        };

        fetchData();
    }, []);

    if (!aboutData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header className="about-header">
                <h1>About ISL Connect</h1>
            </header>
            <section className="about-container">
                <div className="about-content">
                    <h2>Our Mission</h2>
                    <p>{aboutData.mission}</p>
                </div>
                <div className="about-content">
                    <h2>What We Offer</h2>
                    <ul>
                        {aboutData.offerings.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="about-content">
                    <h2>Why Choose Us?</h2>
                    <p>{aboutData.whyChooseUs}</p>
                </div>
            </section>
            <footer className="about-footer">
                <p>&copy; 2024 Seamless Communication | Designed for Inclusion</p>
            </footer>
        </div>
    );
};

export default AboutUsPage;
