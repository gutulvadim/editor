import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import * as ES6 from 'es6-shim';
import { Pane }  from "./components/Pane";
import shapeReducer from './reducers/ShapeReducer';

var actions = [];
var defaultState = { nextShapeId:0, paletteWidth:60, shapes:[] };

let store = createStore(shapeReducer, defaultState);
ReactDOM.render(
    <Provider store={store}>
        <Pane />
    </Provider>,
    document.getElementById("pane")
);
