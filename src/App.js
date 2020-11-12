import "./App.css";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import _ from "lodash";

const item = {
	id: "asdasd",
	name: "Clean the house"
};

function App() {
	const [state, setState] = useState({
		todo: {
			title: "",
			items: []
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

	return (
		<div className="App">
			<DragDropContext onDragEnd={e => console.log(e)}>
				{_.map(state, (data, key) => {
					return (
						<div className="column">
							<h3>{data.title}</h3>
							<Droppable>{provided => {}}</Droppable>
						</div>
					);
				})}
			</DragDropContext>
		</div>
	);
}

export default App;
