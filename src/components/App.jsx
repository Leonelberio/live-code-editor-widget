import Editor from './Editor'
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { FaHtml5, FaTrash } from 'react-icons/fa';
import { FaCss3 } from 'react-icons/fa';
import { FaJs } from 'react-icons/fa';
import { FaFileExport } from 'react-icons/fa';


// import { FaHtml5 } from 'react-icons/fa';






function App() {

  const [htmlCode, setHtml] =  useLocalStorage('html', '');
  const [cssCode, setCss] =  useLocalStorage('css', '');
  const [jsCode, setJs] =  useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('')

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

  return (
    <>
    <div className="container">
      <div className="export-container">

    <button onClick={handleExport}><FaFileExport className='icon'/> Export</button>
    <button onClick={handleDelete}><FaTrash className='icon'/> Clear All</button>

      </div>
        <div className='pane top-pane'>
          <Editor language={html()} displayName="HTML" value={htmlCode} handleChange={setHtml} brand={<FaHtml5/>}/>
          <Editor language={css()} displayName="CSS" value={cssCode} handleChange={setCss} brand={<FaCss3/>}/>
          <Editor language={[javascript({ jsx: true })]} displayName="Javascript" value={jsCode} handleChange={setJs} brand={<FaJs/>}/>
        </div>
        <div className='pane'>
          <iframe title='output' sandbox='allow-scripts' frameBorder="0" width="100%" height="100%" srcDoc={srcDoc}>
          </iframe>
        </div>
    </div>
    </>
  )
}

export default App
