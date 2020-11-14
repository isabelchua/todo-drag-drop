import { combineReducers } from "redux";
import ListReducer from "./ListReducer";

const RootReducer = combineReducers({
	List: ListReducer
});

export default RootReducer;
