import React from 'react';

const Settings = () => {
    return (
        <div>
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>ISLConnect - Settings</h1>
            </header>

            <div style={styles.settingsContainer}>
                <h2 style={styles.settingsTitle}>Settings</h2>

                <div style={styles.settingsGroup}>
                    <label htmlFor="language" style={styles.label}>Preferred Language:</label>
                    <select id="language" name="language" style={styles.select}>
                        <option value="english">English</option>
                        <option value="asl">American Sign Language</option>
                        <option value="bsl">British Sign Language</option>
                    </select>
                </div>

                <div style={styles.settingsGroup}>
                    <label htmlFor="theme" style={styles.label}>Theme:</label>
                    <select id="theme" name="theme" style={styles.select}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>

                <div style={styles.settingsGroup}>
                    <label style={styles.checkboxLabel}>
                        <input type="checkbox" id="notifications" name="notifications" style={styles.checkbox} />
                        Enable Notifications
                    </label>
                </div>

                <div style={styles.settingsGroup}>
                    <label htmlFor="username" style={styles.label}>Your Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        style={styles.input}
                    />
                </div>

                <div style={styles.settingsGroup}>
                    <button type="submit" style={styles.button}>Save Settings</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    header: {
        background: 'linear-gradient(90deg, #b6419a, #81c784)',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        margin: 0,
        fontSize: '24px',
    },
    settingsContainer: {
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    settingsTitle: {
        marginTop: 0,
        color: '#b6419a',
    },
    settingsGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    select: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: '10px',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        background: '#b6419a',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    buttonHover: {
        background: '#a1358d',
    },
};

export default Settings;
