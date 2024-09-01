import React, { useEffect, useState } from 'react';

function App() {
  const [isPrankActive, setIsPrankActive] = useState(true);

  useEffect(() => {
    if (isPrankActive) {
      // Force fullscreen
      const requestFullScreen = () => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
          element.msRequestFullscreen();
        }
      };

      requestFullScreen();

      // Play siren sound
      const siren = new Audio('./Bikhra_-_Ringtone__download_Link_%F0%9F%91%87__SH_Beats(128k).mp3');
      siren.loop = true;
      siren.play();

      // Disable right-click
      const handleContextMenu = (e) => e.preventDefault();
      document.addEventListener('contextmenu', handleContextMenu);

      // Disable keyboard (except Escape key)
      const handleKeydown = (e) => {
        if (e.key !== 'Escape') {
          e.preventDefault();
        } else {
          closePrank();
        }
      };
      document.addEventListener('keydown', handleKeydown);

      // Disable mouse and touch events
      const handleMouseEvent = (e) => e.preventDefault();
      document.addEventListener('mousedown', handleMouseEvent);
      document.addEventListener('mouseup', handleMouseEvent);
      document.addEventListener('mousemove', handleMouseEvent);
      document.addEventListener('touchstart', handleMouseEvent);
      document.addEventListener('touchend', handleMouseEvent);
      document.addEventListener('touchmove', handleMouseEvent);

      // Disable scrolling
      document.body.style.overflow = 'hidden';

      // Reattempt fullscreen on click
      const handleClick = () => requestFullScreen();
      document.addEventListener('click', handleClick);

      // Cleanup
      return () => {
        document.exitFullscreen();
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('mousedown', handleMouseEvent);
        document.removeEventListener('mouseup', handleMouseEvent);
        document.removeEventListener('mousemove', handleMouseEvent);
        document.removeEventListener('touchstart', handleMouseEvent);
        document.removeEventListener('touchend', handleMouseEvent);
        document.removeEventListener('touchmove', handleMouseEvent);
        document.body.style.overflow = 'auto';
        document.removeEventListener('click', handleClick);
      };
    }
  }, [isPrankActive]);

  const closePrank = () => {
    setIsPrankActive(false);
    window.location.reload(); // Reload the page to reset
  };

  return (
    <div className="container">
      {isPrankActive && (
        <div className="content">
          <h1>Due to your inappropriate searches, we banned you from the internet!</h1>
          <p>Pay the fine to remove this ban.</p>
          <p>Press the secret button (top right corner) to close this screen.</p>
          {/* Secret button for mobile */}
          <button onClick={closePrank} className="secret-button" aria-label="Close Prank">
            Secret Button
          </button>
        </div>
      )}
    </div>
  );
}

export default App;