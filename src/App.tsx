import React, { useState } from 'react';
import './styles/App.sass';
import { convert } from './json-to-apidoc';
import riddleTxt from './riddle';

function App() {
	const [text, setText] = useState('');
	const [showRiddle, setShowRiddle] = useState(false);

	function format(str = '') {
		const arr = str.split('\n');
		return arr.map((a) => <div>{a}</div>);
	}

	return (
		<>
			<button onClick={() => setShowRiddle(!showRiddle)}>showRiddle</button>
			{showRiddle && <Riddle/>}
			{!showRiddle &&
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ flex: 1 }}>
        <textarea
          style={{ width: '100%', height: '100%' }}
          onChange={(e) => {
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
      </div>}
		</>
	);
}

const Riddle = () => {
	const [riddles] = useState<String[]>(riddleTxt.split('\n'));
	const [filterRiddles, setFilterRiddles] = useState<String[]>([]);
	const filter = (e: React.FormEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value;
		if (val) {
			setFilterRiddles(riddles.filter(r => r.includes(val)))
		} else {
			setFilterRiddles([]);
		}

	}
	return <div>
		<input onChange={filter}/>
		<ul>
			{filterRiddles.map(r => <li>{r}</li>)}
		</ul>
	</div>;
}

export default App;
