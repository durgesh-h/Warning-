import React, { useEffect, useState } from 'react';

function App() {
  const [isPrankActive, setIsPrankActive] = useState(true); // Prank is active by default

  useEffect(() => {
    if (isPrankActive) {
      // Trigger fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }

      // Play siren sound
    //  const siren = new Audio('/siren.mp3');
     // siren.loop = true;
     // siren.play();

      // Disable right-click
      const handleContextMenu = (e) => e.preventDefault();
      document.addEventListener('contextmenu', handleContextMenu);

      // Block all keyboard inputs except a secret key (Escape for desktop, Secret button for mobile)
      const handleKeydown = (e) => {
        if (e.key !== 'Escape') {
          e.preventDefault();
        } else {
          closePrank();
        }
      };
      document.addEventListener('keydown', handleKeydown);

      // Cleanup
      return () => {
        document.exitFullscreen();
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeydown);
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