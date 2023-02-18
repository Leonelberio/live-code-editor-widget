import Editor from './Editor'
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { FaHtml5 } from 'react-icons/fa';
import { FaCss3 } from 'react-icons/fa';
import { FaJs } from 'react-icons/fa';

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
  

  return (
    <>
    <div className="container">

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
