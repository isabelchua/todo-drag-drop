import "./App.css";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";

const item = {
	id: v4(),
	name: "Wake up"
};

const item2 = {
	id: v4(),
	name: "Clean the house"
};

console.log(item);

function App() {
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

	const handleDragEnd = ({ destination, source }) => {
		//console.log(data);
		console.log("from", source);
		console.log("to", destination);

		if (!destination) {
			console.log("not dropped in droppable");
			return;
		}

		if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		) {
			console.log("dropped in same place");
			return;
		}

		// const itemCopy = state[source.droppableId].items[source.index]

		// creating a copy of item before removing it from state
		const itemCopy = { ...state[source.droppableId].items[source.index] };
		setState(prev => {
			prev = { ...prev };
			// remove from previous items array
			prev[source.droppableId].items.splice(source.index, 1);

			// adding to new items array location
			prev[destination.droppableId].items.splice(
				destination.index,
				0,
				itemCopy
			);

			return prev;
		});
		//console.log(itemCopy);
	};

	const addItem = () => {
		setState(prev => {
			return {
				...prev,
				todo: {
					Title: "title",
					items: [
						{
							id: "",
							name: text
						},
						...prev.todo.items
					]
				}
			};
		});
		setText();
	};

	return (
		<div className="App">
			<div>
				<input
					type="text"
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<button onClick={addItem}>Add</button>
			</div>
			<DragDropContext onDragEnd={handleDragEnd}>
				{_.map(state, (data, key) => {
					return (
						<div key={key} className="column">
							<h3>{data.title}</h3>
							<Droppable droppableId={key}>
								{provided => {
									return (
										<div
											ref={provided.innerRef}
											{...provided.droppableProps}
											className="droppable-col"
										>
											{data.items.map((el, index) => {
												return (
													<Draggable
														key={el.id}
														index={index}
														draggableId={el.id}
													>
														{(provided, snapshot) => {
															console.log(snapshot);
															return (
																<div
																	className={`item ${
																		snapshot.isDragging &&
																		"dragging"
																	}`}
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																>
																	{el.name}
																</div>
															);
														}}
													</Draggable>
												);
											})}
											{provided.placeholder}
										</div>
									);
								}}
							</Droppable>
						</div>
					);
				})}
			</DragDropContext>
		</div>
	);
}

export default App;
