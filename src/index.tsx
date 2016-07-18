import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import * as ES6 from 'es6-shim';

import Canvas  from "./components/Canvas";
import Palette  from "./components/Palette";
import shapeReducer from './reducers/ShapeReducer';

var actions = [];
var defaultState = { nextShapeId:0, shapes:[] };

let store = createStore(shapeReducer, defaultState);

ReactDOM.render( <Provider store={store}>
    <div>
        <Canvas/>
    </div>
    </Provider>,
    document.getElementById("canvas")
);
function allowDrop(event) {

}
document.getElementById("canvas").addEventListener('drop', onCanvasDrop);
document.getElementById("canvas").addEventListener('dragover', onCanvasDragOver);
document.getElementById("circle").addEventListener('dragstart', onDragStart);
document.getElementById("rectangle").addEventListener('dragstart', onDragStart);
document.getElementById("triangle").addEventListener('dragstart', onDragStart);

function onCanvasDrop(ev) {
    console.log(ev.dataTransfer.getData("shape"));
    ev.preventDefault();
    store.dispatch({type: 'SHAPE_ADD', name: ev.dataTransfer.getData("shape"), x: ev.pageX, y: ev.pageY, w: 100, h: 100});
}
function onCanvasDragOver(ev) {
    console.log('onCanvasDragOver');
    ev.preventDefault();
}
function onDragStart(ev) {
    ev.dataTransfer.setData("shape", ev.target.id);
    console.log('onDragStart');
}
