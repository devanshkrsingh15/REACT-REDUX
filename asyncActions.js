const axios = require("axios");
const reduxThunk = require("redux-thunk").default;
const redux = require("redux");
const createStore =  redux.createStore;
const applyMiddleware = redux.applyMiddleware;

//initial state
const initialState = {
  loading: false,
  users: [],
  error: "",
};

//action types
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

//action creator
function fetchUserRequest() {
  return {
    type: FETCH_USER_REQUEST,
  };
}

function fetchUserSuccess(users) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
}

function fetchUserFailure(err) {
  return {
    type: FETCH_USER_FAILURE,
    payload: err,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_FAILURE:
      return { loading: false, users: [], err: action.payload };
    case FETCH_USER_SUCCESS:
      return { loading: false, users: action.payload, err: "" };

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(reduxThunk));

const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data.map((user) => user.name);
        dispatch(fetchUserSuccess(users));
      })
      .catch((err) => {
        dispatch(fetchUserFailure(err));
      });
  };
};

store.subscribe(() => {
  console.log("Updated Store", store.getState());
});

store.dispatch(fetchUser());
