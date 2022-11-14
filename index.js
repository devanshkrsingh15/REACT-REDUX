const redux = require("redux");
const createStore = redux.createStore;
const BUY_CAKE = "BUY_CAKE";

//actions creator
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "buying cake",
  };
}

const initialState = {
  numOfCakes: 10,
};

//(prevState,action) = newState
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { ...state, numOfCakes: state.numOfCakes - 1 };

    default:
      return state;
  }
};

const store = createStore(reducer);

console.log("Initial Store", store.getState());
const unsubscribe =  store.subscribe(() => {
  console.log("Updated Store", store.getState());
});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();
store.dispatch(buyCake());
console.log("Final Store", store.getState());