import React, { useState } from 'react';

const YouTubeWithSignLanguage = () => {
  const [videoId, setVideoId] = useState('hN_1aQwfy1A');
  const [signLanguageVideo, setSignLanguageVideo] = useState('');
  const [error, setError] = useState('');

  const changeVideo = () => {
    const videoIdInput = document.getElementById('video-id').value.trim();
    if (videoIdInput) {
      setVideoId(videoIdInput);
      setSignLanguageVideo('');  // Reset previous sign language video
      setError('');
    } else {
      alert('Please enter a valid YouTube video ID!');
    }
  };

  const fetchSignLanguageVideo = (query) => {
    const requestBody = query.startsWith("http")
      ? { url: query }
      : { query: query };

    fetch('http://127.0.0.1:5000/process_video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setSignLanguageVideo(data.video_path);  // Set the video URL for display
      }
    })
    .catch(error => {
      setError(error.message);
    });
  };

  const handleSubmit = () => {
    const videoQuery = document.getElementById('video-id').value.trim();
    fetchSignLanguageVideo(videoQuery);  // Make the API call
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0', fontFamily: 'Arial, sans-serif', background: 'linear-gradient(135deg, #9c89e1, #d1f0d1)', color: '#333' }}>
      <h1 style={{ margin: '20px 0', fontSize: '2rem', color: '#4a4a4a', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>
        YouTube Video with Sign Language Translation
      </h1>

      {/* Controls for Changing Video */}
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <input 
          id="video-id" 
          type="text" 
          placeholder="Enter YouTube Video ID or URL" 
          style={{ padding: '10px', fontSize: '1rem', margin: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={handleSubmit} 
          style={{ padding: '10px', fontSize: '1rem', margin: '5px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#9c89e1', color: 'white', cursor: 'pointer' }}
        >
          Convert to Sign Language
        </button>
      </div>

      {/* YouTube Video Section */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', width: '100%', maxWidth: '1000px', marginTop: '20px', padding: '10px' }}>
        <div style={{ flex: 3, border: 'none', borderRadius: '15px', padding: '15px', background: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '15px', color: 'goldenrod' }}>YouTube Video</h3>
          <iframe 
            id="youtube-player"
            src={`https://www.youtube.com/embed/${videoId}`} 
            allowFullScreen 
            style={{ width: '100%', height: '500px', border: 'none', borderRadius: '10px' }}
          ></iframe>
        </div>
      </div>

      {/* Error Handling */}
      {error && (
        <div style={{ color: 'red', margin: '20px 0' }}>
          <p>Error: {error}</p>
        </div>
      )}

      {/* Sign Language Translation Section */}
      {signLanguageVideo && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '300px', border: 'none', borderRadius: '15px', padding: '15px', background: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '15px', color: 'goldenrod' }}>Sign Language Translation</h3>
          <video controls style={{ width: '100%', height: '200px', border: 'none', borderRadius: '10px' }}>
            <source src={signLanguageVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default YouTubeWithSignLanguage;
  
  // In the above code, we have created a React component called  YouTubeWithSignLanguage . This component will render a simple UI with an input field to enter a YouTube video ID or URL. When the user enters a valid YouTube video ID or URL and clicks the “Convert to Sign Language” button, the component will make a POST request to the Flask API to process the video and get the sign language translation. 
  // The component will display the original YouTube video and the sign language translation video side by side. The original YouTube video will be displayed in an  iframe  element, and the sign language translation video will be displayed in a  video  element. 
  // Now, let’s create a simple React app to render this component. 
  // Create a React App 
  // First, create a new React app using the following command: 
  // npx create-react-app youtube-sign-language
  
  // This command will create a new React app called  youtube-sign-language . 
  // Now, navigate to the project directory: 
  // cd youtube-sign-language
  
  // Next, install the  axios  package to make HTTP requests from the React app: 
  // npm install axios
  
  // Now, replace the contents of the  src/App.js  file with the following code: