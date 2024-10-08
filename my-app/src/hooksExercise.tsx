import React, { useState, useEffect } from 'react';

export function ClickCounter() {
 const [count, setCount] = useState(0);

 const handleClick = () => {
   setCount(count + 1);
 };

 useEffect(() => {
   document.title = `You clicked ${count} times`;
 }, [count]);

 return (
   <div>
     <p>Clicks: {count}</p>
     <button onClick={handleClick}>Click me!</button>
   </div>
 );
}
  
  export default ClickCounter;