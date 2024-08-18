import  { useState, useEffect } from "react";
import Bg from "./Bg";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, []); 

  return (
    <div>
      {isLoading ? (
        <div className='bg-slate-950' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <Bg />
      )}
    </div>
  );
}

export default App;
