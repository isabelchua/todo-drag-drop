import { combineReducers } from "redux";
import ListReducer from "./ListReducer";

const rootReducer = combineReducers({
	List: ListReducer
});

export default rootReducer;
