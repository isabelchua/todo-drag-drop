import { initial } from "lodash";
import { v4 } from "uuid";

const initialState = [
	{
		id: 1,
		name: "gym",
		duration: "1 hour"
	},

	{
		id: 1,
		name: "John Doe"
	}
];

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
