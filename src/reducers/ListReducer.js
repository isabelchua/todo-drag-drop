import { initial } from "lodash";
import { v4 } from "uuid";

const item = {
	id: v4(),
	name: "Wake up"
};

const item2 = {
	id: v4(),
	name: "Clean the house"
};

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

const ListReducer = (state = initialState, action) => {};

export default ListReducer;
