import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Pane }  from "./components/Pane";
import shapeReducer from './reducers/ShapeReducer';

let defaultState = { nextShapeId:0, paletteWidth:60, shapeWidth:100, shapeHeight:100, shapes:[] };
let store = createStore(shapeReducer, defaultState);

ReactDOM.render(
  <Provider store={store}>
    <Pane />
  </Provider>,
  document.getElementById("pane")
);
