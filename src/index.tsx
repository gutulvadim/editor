import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import * as ES6 from 'es6-shim';

import { Hello } from "./components/Hello";
//import  Circle  from "./components/Circle";
import  ShapeViewer  from "./components/ShapeViewer";

var actions = [];
var defaultState = { nextShapeId:0, width: 50, height: 90, color:"#000000", shapes:[] };

/*
var userReducer = function(state, action) {
    if (state === undefined) {
        state = [];
    }
    if (action.type === 'ADD_USER') {
        state.push(action.user);
    }
    return state;
}*/

// Create a store by passing in the reducer
//var store = createStore(userReducer);

// Dispatch our first action to express an intent to change the state
//{ [action.x]: state[action.x] + action.by, [action.width]: state[action.width] + action.by1 });

let store = createStore(
    (state, action) => {
        switch (action.type) {
            //case 'POSITION_CHANGE':
               // return Object.assign({}, state, { x: action.x, y: action.y });
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
/*
ReactDOM.render( <Provider store={store}>
        <Circle x={100} y={60} r={50} />
    </Provider>,
    document.getElementById("canvas")
);
*/
ReactDOM.render( <Provider store={store}>
        <ShapeViewer/>
    </Provider>,
    document.getElementById("canvas")
);
document.getElementById("circle").addEventListener('mouseup', onCircleMouseClick);
document.getElementById("rectangle").addEventListener('mouseup', onRectangleMouseClick);
function onCircleMouseClick() {
    store.dispatch({type: 'SHAPE_ADD', name: 'circle', x:100, y:300, r:50 });
}
function onRectangleMouseClick() {
    store.dispatch({type: 'SHAPE_ADD', name: 'rectangle', x:100, y:200, w:100, h:100 });
}

/*
store.dispatch(   {
    type: 'ADD_USER',
    user: {name: 'Dan'}
});
*/
/*
ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);
*/

/*

let store = createStore(
    (state, action) => {
        switch (action.type) {
            case 'INCR':
                return { counter: state.counter + action.by };
            default:
                return state;
        }
    },
    { counter: 0 });

export default class Counter extends React.Component<any, any> {
    private unsubscribe: Function;
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return (
            <div>
                <p>
                    <label>Counter: </label><b>#{store.getState().counter}</b>
                </p>
                <button onClick={e => store.dispatch({ type:'INCR', by: 1 }) }>INCREMENT</button>
                <span style={{ padding: "0 5px" }} />
                <button onClick={e => store.dispatch({ type:'INCR', by: -1 }) }>DECREMENT</button>
            </div>
        );
    }
}
/*
ReactDOM.render(
    <Provider store={store}>
        <Counter />
    </Provider>,
    document.getElementById("board"));
    */
/*
import Counter from './components/Counter';

let store = createStore(
    (state, action) => {
        switch (action.type) {
            case 'COUNTER_CHANGE':
                return Object.assign({}, state, { [action.x]: state[action.x] + action.by, [action.width]: state[action.width] + action.by1 });
            default:
                return state;
        }
    },
    defaultState);

ReactDOM.render(
    <Provider store={store}>
        <Counter  x="x"  field1="width" step={10} step1={1} />
    </Provider>,
    document.getElementById("example"));
*/