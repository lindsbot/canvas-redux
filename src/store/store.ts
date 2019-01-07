import { createStore, combineReducers } from 'redux';
import { rectanglesReducer } from './rectangles/reducers';

const initialState: any = {
  rectangles: []
}

export const store = createStore(rectanglesReducer, initialState);
