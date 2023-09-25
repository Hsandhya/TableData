// src/reducers/beerReducer.js
import {
  FETCH_BEERS_SUCCESS,
  FETCH_BEERS_FAILURE,
  UPDATE_SEARCH_QUERY,
  UPDATE_CURRENT_PAGE,
  UPDATE_BREWED_STATE,
} from '../Actions/actionTypes';

const initialState = {
  beers: [],
  loading: false,
  error: null,
  currentPage: 1,
  brewDate: '',
  searchQuery: '',
  brewState: '',
  totalItems:'75',
  brewedState:''
};


const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BEERS_SUCCESS:
      return {
        ...state,
        beers: action.payload,
        loading: false,
      };
    case FETCH_BEERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case UPDATE_BREWED_STATE:
      return {
        ...state,
        brewedState: action.payload
      }
    default:
      return state;
  }
};

export default DataReducer;


