import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import * as ES6 from 'es6-shim';

import  Canvas  from "./components/Canvas";
import  Palette  from "./components/Palette";

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
                var shape = state.shapes.filter(x => x.id === action.id)[0];
                var shape_index = state.shapes.indexOf(shape);
                var new_shape = Object.assign({}, shape, { x: action.x, y: action.y });
                var new_shapes = [...state.shapes];
                new_shapes[shape_index] = new_shape;
                console.log(shape);
                return Object.assign({}, state, { shapes: new_shapes });

            case 'SHAPE_BACK':
                var shape = state.shapes.filter(x => x.id === action.id)[0];
                var shape_index = state.shapes.indexOf(shape);
                if(shape_index==0 || state.shapes.length <= 1) return state;
                var new_shapes = [...state.shapes];
                [new_shapes[shape_index-1], new_shapes[shape_index]] = [new_shapes[shape_index], new_shapes[shape_index-1]];
                console.log(shape);
                return Object.assign({}, state, { shapes: new_shapes });
            case 'SHAPE_FORWARD':
                var shape = state.shapes.filter(x => x.id === action.id)[0];
                var shape_index = state.shapes.indexOf(shape);
                if(state.shapes.length <= 1 || shape_index==state.shapes.length-1) return state;
                var new_shapes = [...state.shapes];
                [new_shapes[shape_index+1], new_shapes[shape_index]] = [new_shapes[shape_index], new_shapes[shape_index+1]];
                console.log(shape);
                return Object.assign({}, state, { shapes: new_shapes });

            default:
                return state;
        }
    },
    defaultState);

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
