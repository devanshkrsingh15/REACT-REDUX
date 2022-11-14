const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//actions creator
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "buying cake",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "buying ice-cream",
  };
}

const initialState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCream: 10,
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

const IceCreamreducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return { ...state, numOfIceCream: state.numOfIceCream - 1 };

    default:
      return state;
  }
};

const root = combineReducer({
  cake: reducer,
  iceCream: IceCreamreducer,
});
const store = createStore(root, applyMiddleware(logger));

console.log("Initial Store", store.getState());

// const unsubscribe = c // not required => if logger middleware used

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

console.log("Final Store", store.getState());
