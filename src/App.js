import "./App.scss";
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
		if (!destination) {
			return;
		}

		if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		) {
			return;
		}

		// Creating a copy of item before removing it from state
		const itemCopy = { ...state[source.droppableId].items[source.index] };

		setState(prev => {
			prev = { ...prev };
			// Remove from previous items array
			prev[source.droppableId].items.splice(source.index, 1);

			// Adding to new items array location
			prev[destination.droppableId].items.splice(
				destination.index,
				0,
				itemCopy
			);

			return prev;
		});
	};

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
		<div className="App">
			<div className="inputfield">
				<input
					type="text"
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<button onClick={addItem}>Add</button>
			</div>
			<div className="lists">
				<DragDropContext onDragEnd={handleDragEnd}>
					{_.map(state, (data, key) => {
						return (
							<div key={key} className="column">
								<h3>{data.title}</h3>
								<div>
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
																	//console.log(snapshot);
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
							</div>
						);
					})}
				</DragDropContext>
			</div>
		</div>
	);
}

export default App;
