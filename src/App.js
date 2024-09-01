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
      const siren = new Audio('/siren.mp3');
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
    <div className="flex items-center justify-center min-h-screen bg-red-600 text-white text-center p-4">
      {isPrankActive && (
        <div>
          <h1 className="text-4xl font-bold mb-8">Due to your inappropriate searches, we banned you from the internet!</h1>
          <p className="text-2xl mb-8">Pay the fine to remove this ban.</p>
          <p className="text-sm">Press the secret button (top right corner) to close this screen.</p>
          {/* Secret button for mobile */}
          <button
            onClick={closePrank}
            className="absolute top-2 right-2 p-2 bg-transparent text-transparent"
            aria-label="Close Prank"
          >
            Secret Button
          </button>
        </div>
      )}
    </div>
  );
}

export default App;