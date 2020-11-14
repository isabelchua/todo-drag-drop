import React, { useState } from "react";
import { v4 } from "uuid";

const item = {
	id: v4(),
	name: "Wake up"
};

const item2 = {
	id: v4(),
	name: "Clean the house"
};

export function InputField() {
	const [text, setText] = useState("");
	const [state, setState] = useState({
		todo: {
			title: "Todo",
			items: [item, item2]
		},
		"in-progress": {
			title: "In Progress",
			items: []
		},
		done: {
			title: "Completed",
			items: []
		}
	});

	const addItem = () => {
		setState(prev => {
			return {
				...prev,
				todo: {
					title: "Todo",
					items: [
						{
							id: v4(),
							name: text
						},
						...prev.todo.items
					]
				}
			};
		});
		setText("");
	};

	return (
		<div className="inputfield">
			<input
				type="text"
				value={text}
				onChange={e => setText(e.target.value)}
			/>
			<button onClick={addItem}>Add</button>
		</div>
	);
}

export default InputField;
