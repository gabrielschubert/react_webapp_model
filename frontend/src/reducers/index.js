import { combineReducers } from "redux";
import { authentication } from "./authentication";
import { pageQty } from "./page_quantity";
import { pagination } from "./pagination";
import { searchState } from "./search";
import { itemsList } from "./items_list"

const rootReducer = combineReducers({
  authentication,
  pageQty,
  pagination,
  searchState,
  itemsList
});

export default rootReducer;
