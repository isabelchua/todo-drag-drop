import React, { useState } from "react";
import { v4 } from "uuid";
// import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";

const item = {
	id: v4(),
	name: "Wake up"
};

const item2 = {
	id: v4(),
	name: "Clean the house"
};

export function InputField() {
	const dispatch = useDispatch();
	// const allList = useSelector(state => state.)
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
		dispatch({
			type: "CREATE_TODO",
			payload: {
				name: text
			}
		});
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
