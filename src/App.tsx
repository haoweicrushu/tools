import React, { useState } from 'react';
import './styles/App.sass';
import { convert } from './json-to-apidoc';

function App() {
  const [text, setText] = useState('');

  function format(str = '') {
    const arr = str.split('\n');
    return arr.map(a => <div>{a}</div>);
  }

  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ flex: 1 }}>
          <textarea
            style={{ width: '100%', height: '100%' }}
            onChange={e => {
              try {
                JSON.parse(e.target.value);
                setText(convert(e.target.value));
              } catch (e) {
                setText('wrong json format');
              }
            }}
            defaultValue=""
          ></textarea>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ width: '100%', height: '100%', padding: '10px' }}>{format(text)}</div>
        </div>
      </div>
    </>
  );
}

export default App;
