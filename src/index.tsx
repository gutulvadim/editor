import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import * as ES6 from 'es6-shim';

import  ShapeViewer  from "./components/ShapeViewer";

var actions = [];
var defaultState = { nextShapeId:0, width: 50, height: 90, color:"#000000", shapes:[] };

let store = createStore(
    (state, action) => {
        switch (action.type) {
            case 'SHAPE_ADD':
                var id = state.nextShapeId;
                var shape = Object.assign({}, { id: id }, action);
                delete shape['type'];
                return Object.assign({}, state, { nextShapeId: id + 1, shapes: [...state.shapes, shape] });
            case 'SHAPE_CHANGE':
                var shape = Object.assign({}, state.shapes.filter(x => x.id === action.id)[0],
                    { x: action.x, y: action.y });
                console.log(shape);
                return Object.assign({}, state,
                    { shapes: [...state.shapes.filter(x => x.id !== action.id), shape] });
            default:
                return state;
        }
    },
    defaultState);

ReactDOM.render( <Provider store={store}>
        <ShapeViewer/>
    </Provider>,
    document.getElementById("canvas")
);
document.getElementById("circle").addEventListener('mouseup', onCircleMouseClick);
document.getElementById("rectangle").addEventListener('mouseup', onRectangleMouseClick);
document.getElementById("triangle").addEventListener('mouseup', onTriangleMouseClick);
function onCircleMouseClick() {
    store.dispatch({type: 'SHAPE_ADD', name: 'circle', x:100, y:300, w:100, h:100 });
}
function onRectangleMouseClick() {
    store.dispatch({type: 'SHAPE_ADD', name: 'rectangle', x:100, y:200, w:100, h:100 });
}
function onTriangleMouseClick() {
    store.dispatch({type: 'SHAPE_ADD', name: 'triangle', x:100, y:200, w:100, h:100 });
}