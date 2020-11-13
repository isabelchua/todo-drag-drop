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
		const itemCopy = { ...state[source.droppableId].items[source.index] };
		setState(prev => {
			prev = { ...prev };
			prev[source.droppableId].items.splice(source.index, 1);
			return prev;
		});
		//console.log(itemCopy);
	};

	return (
		<div className="App">
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
														{provided => {
															return (
																<div
																	className="item"
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
