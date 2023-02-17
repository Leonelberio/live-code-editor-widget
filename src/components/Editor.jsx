import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { githubDark } from '@uiw/codemirror-theme-github';
// import { historyField } from '@codemirror/commands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt, faCode } from '@fortawesome/free-solid-svg-icons'


function Editor(props) {
const {
    language,
    displayName,
    value,
    handleChange,
    icon
} = props;
const [open, setOpen] = useState(true)

const onChange = React.useCallback((value, viewUpdate) => {
        handleChange(value);
      }, []);

return (
<div className={`editor-container ${open ? '' : 'collapsed'}`}>
    <div className="editor-title">
    <FontAwesomeIcon icon={icon} /> {displayName}
    <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
    </div>

<CodeMirror
  value={value}
  height="100%"
  theme={githubDark}
  extensions={language}
  onChange={onChange}
  className="code-mirror-wrapper"

 
/>
</div>

        )
}

export default Editor