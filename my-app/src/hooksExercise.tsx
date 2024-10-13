import { useContext } from 'react';
import { ThemeContext, themes } from "./ThemeContext";
import React, { useState, useEffect } from 'react';



export function ClickCounter() {
    {/* 
        -creates variable count, with setcount as the function that updates it
        -initializes count to be 0 
        -useState is a react hook that declares the above^
        */}
 const [count, setCount] = useState(0);
        //handleClick is a function that increments count, using setCount function
 const handleClick = () => {
   setCount(count + 1);
 };

    {/*
        -useEffect is a reacthook 
        -updates the name of the document every time count is incremented 
        */}
 useEffect(() => {
   document.title = `You clicked ${count} times`;
 }, [count]);//dependency array: works like the trigger to a trap, runs when count changes

    //useContext hook is used to access theme-related styles from ThemeContext for styling 
    const theme = useContext(ThemeContext);

    //renders everything/kind of like the styling 
return (
   <div
    style={{
     background: theme.background,
       color: theme.foreground,
       padding: "20px",
     }}
   >
     <p>You clicked {count} times </p>
     <button
       onClick={() => setCount(count + 1)} //incrememnts count by 1 when clicked 
       style={{ background: theme.foreground, color: theme.background }}
     >
       Click me
     </button>
   </div>
 );
}



  function ToggleTheme() {
    {/*
        -useState is a react hook that does the below things:
        -initializes the theme to light 
        -creates the variable currentTheme and the function setCurrentTheme which updates currentTheme
        */}
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    //fucntion that changes the current theme to the opposite of the current theme
    const toggleTheme = () => {
      setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
  
    //basically renders everything 
    {/*
        provides context to ClickCounter, specifically currentTheme
        */}

    return (
      <ThemeContext.Provider value={currentTheme}>
        <button onClick={toggleTheme}> Toggle Theme </button>
        <ClickCounter />
      </ThemeContext.Provider>
    );
   }
   export default ToggleTheme;