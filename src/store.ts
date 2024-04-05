import { createStore } from "redux";

import rootReducers from "./reducers";

const store = createStore(rootReducers);

export type RootState = ReturnType<typeof store.getState>;

export default store;
