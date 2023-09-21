// src/actions/beerActions.js
import axios from "axios";
import {
  FETCH_BEERS_SUCCESS,
  FETCH_BEERS_FAILURE,
  UPDATE_SEARCH_QUERY,
  UPDATE_CURRENT_PAGE,
  UPDATE_BREWED_BEFORE,
} from "./actionTypes";

const fetchBeersSuccess = (beers) => ({
  type: FETCH_BEERS_SUCCESS,
  payload: beers,
});

export const fetchBeersFailure = (error) => ({
  type: FETCH_BEERS_FAILURE,
  payload: error,
});

export const updateSearchQuery = (query) => ({
  type: UPDATE_SEARCH_QUERY,
  payload: query,
});

export const updateCurrentPage = (page) => ({
  type: UPDATE_CURRENT_PAGE,
  payload: page,
});

export const updateBrewedBefore = (date) => ({
  type: UPDATE_BREWED_BEFORE,
  payload: date,
});

export const fetchBeers =
  (searchQuery, currentPage, brewedBefore) => async (dispatch) => {
    console.log(brewedBefore, "brewwwwwwwwwwwwwwwwwwwwwwwwww");

    try {
      const response = await axios.get(
        `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=10&${brewedBefore}="10-2010"`
      );

      const filteredBeers = response.data.filter(
        (beer) =>
          beer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          beer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          beer.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      );

      dispatch(fetchBeersSuccess(filteredBeers));
    } catch (error) {
      dispatch(fetchBeersFailure(error));
    }
  };

export { fetchBeersSuccess };
