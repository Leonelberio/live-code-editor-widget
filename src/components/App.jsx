import Editor from './Editor'
import Counter from './Counter'
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { FaHtml5, FaPlay, FaStop, FaTrash } from 'react-icons/fa';
import { FaCss3 } from 'react-icons/fa';
import { FaJs } from 'react-icons/fa';
import { FaFileExport } from 'react-icons/fa';
import popdown from '../assets/sounds/pop-down.mp3'
import popupon from '../assets/sounds/pop-up-on.mp3'
import popupoff from '../assets/sounds/pop-up-off.mp3'
import disable from '../assets/sounds/disable-sound.mp3'



import useSound from 'use-sound';



// import { FaHtml5 } from 'react-icons/fa';






function App() {

  const [htmlCode, setHtml] =  useLocalStorage('html', '');
  const [cssCode, setCss] =  useLocalStorage('css', '');
  const [jsCode, setJs] =  useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('')
  const [time, setTime] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [clearOnEnd, setClearOnEnd] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [autoDestroy, setAutoDestroy] = useState(false);



  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `
        <html>
          <body>${htmlCode}</body>
          <style>${cssCode}</style>
          <script>${jsCode}</script>
        </html>
      `
      )

    }, 250);
    return () => clearTimeout(timeout)
  }, [htmlCode, cssCode, jsCode])
  


  const handleExport = () => {
    // Generate the HTML file content
    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                ${cssCode}
            </style>
        </head>
        <body>
          ${htmlCode}
          
        <script>${jsCode}</script>
        </body>
    </html>`;

    // Create a new Blob object with the HTML file content
    const blob = new Blob([htmlContent], { type: "text" });

    // Create a new URL object from the Blob object
    const url = URL.createObjectURL(blob);

    // Create a new link element to download the HTML file
    const link = document.createElement("a");
    link.download = "index.html";
    link.href = url;
    link.click();
  };

  const handleDelete = () => {
    setHtml('');
    setCss('');
    setJs('');
  }

  const handleStart = () => {
    setTime(parseInt(inputValue, 10));
    setIsRunning(true);
    // setClearOnEnd(e.target.checked);
  };

  const handleStop = () => {
    setIsRunning(false);
    // setClearOnEnd(e.target.checked);
  };

  const [playpop] = useSound(
    disable,
      { volume: 1 }
    );

  const handleTimerEnd = () => {
    setIsRunning(false);
    setInputValue("");
    playpop();
    if(autoDestroy){
      setHtml('');
      setCss('');
      setJs('');
    }
    
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheck = (e) => {
    setAutoDestroy(e.target.checked);
    
  };



  const [playActive] = useSound(
    popdown,
    { volume: 0.25 }
  );
  const [playOn] = useSound(
    popupon,
    { volume: 0.25 }
  );
  const [playOff] = useSound(
    popupoff,
    { volume: 0.25 }
  );



  return (
    <>
    <div className="container">
      <div className="export-container">
        
        <div className="timer">
          <div className="inputcontainer">

        <label htmlFor="input">Timer: </label>
      <input
        type="text"
        id="input"
        value={inputValue}
        onChange={handleInputChange}
      />
          </div>

<div class="checkbox-wrapper-13">

      <input
        type="checkbox"
        id="c1-13"
        checked={autoDestroy}
        onChange={handleCheck}
        onMouseDown={playActive}
        onMouseUp={() => {
        autoDestroy ? playOff() : playOn();
      }}

      />
      <label htmlFor="c1-13">Autodestroy</label>
</div>

    
      {!isRunning ? (
        <button onClick={handleStart} disabled={!inputValue} className="playstopbutton">
          <FaPlay/>
        </button>
      ) : (
<button onClick={handleStop} className="playstopbutton" >
          <FaStop/>
        </button>
      )}
        </div>


        {isRunning && (
        <Counter
          initialTime={time}
          onTimerEnd={handleTimerEnd}
          clearOnEnd={clearOnEnd}
          setInputValue={setInputValue}
        />
      )}
        <div className="export">

    <button onClick={handleExport} className="button"><FaFileExport className='icon'/> Export</button>
    <button onClick={handleDelete} className="button" style={{color: "red"}}><FaTrash className='icon'/> Clear All</button>
        </div>

      </div>


        <div className='pane top-pane'>
          <Editor language={html()} displayName="HTML" value={htmlCode} handleChange={setHtml} brand={<FaHtml5/>}/>
          <Editor language={css()} displayName="CSS" value={cssCode} handleChange={setCss} brand={<FaCss3/>}/>
          <Editor language={[javascript({ jsx: true })]} displayName="Javascript" value={jsCode} handleChange={setJs} brand={<FaJs/>}/>
        </div>
        <div className='pane'>
          <iframe title='output' sandbox='allow-scripts' frameBorder="0" width="100%" height="100%" srcDoc={srcDoc}/>
        </div>
    </div>
    </>
  )
}

export default App
