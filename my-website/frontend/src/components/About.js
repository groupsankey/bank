import React, { useEffect, useState } from 'react';

function About() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/about')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  return (
    <div>
      <h2>About</h2>
      <p>{message}</p>
    </div>
  );
}

export default About;
