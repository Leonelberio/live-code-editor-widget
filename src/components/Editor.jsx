import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { githubDark } from '@uiw/codemirror-theme-github';
// import { historyField } from '@codemirror/commands';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Editor(props) {
const {
    language,
    displayName,
    value,
    handleChange,
    brand
} = props;
const [open, setOpen] = useState(true)

const onChange = React.useCallback((value, viewUpdate) => {
        handleChange(value);
      }, []);

return (
<div className={`editor-container ${open ? '' : 'collapsed'}`}>
    <div className="editor-title">
    {brand} {displayName}
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