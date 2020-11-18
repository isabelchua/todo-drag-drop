import { initial } from "lodash";
import { v4 } from "uuid";

const item = {
	id: v4(),
	name: "Wake up 2"
};

const item2 = {
	id: v4(),
	name: "Clean the house"
};

const initialState = {
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
};

const ListReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case "CREATE_TODO":
			console.log("todo", payload.name);
			console.log("state", state);
			return [...state, { id: v4(), name: payload.name }];
		default:
			return state;
	}
};

export default ListReducer;
