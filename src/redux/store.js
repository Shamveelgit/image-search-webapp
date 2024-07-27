import { createStore } from "redux";



function reducer(state = {},action) {
    console.log("success");
}

const store = createStore(reducer)
const state = store.getState()

export default store