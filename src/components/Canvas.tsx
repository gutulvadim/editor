import * as React from 'react';
import { connect } from 'react-redux';
import { Circle } from "./shapes/Circle";
import { Square } from "./shapes/Square";
import { Triangle } from "./shapes/Triangle";
import { Actions } from "../reducers/ShapeReducer";
import {IShape} from "./shapes/Shape";
import {IShapeDispatcher} from "./shapes/Shape";

export interface ICanvasState {
    shapes?: IShape[],
    shapeHeight?: number,
    shapeWidth?: number
}

export interface ICanvasDispatcher extends IShapeDispatcher{
    addShape?: (name: string, x: number, y: number, w: number, h: number) => void,
}

export interface ICanvas extends ICanvasState, ICanvasDispatcher {
}

class Canvas extends React.Component<ICanvas, {}> {
    constructor(props?, context?) {
        super(props, context);
    }

    shapeAttributes(s) {
        return { x: s.x, y: s.y, width: s.w, height: s.h, key: s.id, id: s.id,
            moveShape: this.props.moveShape, bringForward: this.props.bringForward, pushBack: this.props.pushBack};
    }

    generateShape(shape_data) {
        let attributes = this.shapeAttributes(shape_data)
        switch (shape_data.name) {
            case 'circle':
                return <Circle { ...attributes } />;
            case 'rectangle':
                return <Square { ...attributes } />;
            case 'triangle':
                return <Triangle { ...attributes } />;
        }
    }

    render() {
        let shapes = this.props.shapes.map(this.generateShape.bind(this));

        return (
            <div className="canvas-container" onDrop={this.onCanvasDrop.bind(this)} onDragOver={this.onCanvasDragOver.bind(this)}>
                <svg className="canvas">{shapes}</svg>
            </div>
        );
    }

    onCanvasDrop(ev) {
        ev.preventDefault();
        this.props.addShape(
            ev.dataTransfer.getData("shape"),
            ev.pageX,
            ev.pageY,
            this.props.shapeHeight,
            this.props.shapeWidth
        );
    }

    onCanvasDragOver(ev) {
        ev.preventDefault();
    }
}

export default connect(
    (state):ICanvasState => ({ shapes: state.shapes, shapeHeight: state.shapeHeight, shapeWidth: state.shapeWidth }),
    (dispatch):ICanvasDispatcher => ({
        moveShape: (id: number, x: number, y: number) => dispatch({ type:Actions.SHAPE_MOVE, id, x, y}),
        pushBack: (id: number) => dispatch({ type:Actions.SHAPE_BACK, id}),
        bringForward: (id: number) => dispatch({ type:Actions.SHAPE_FORWARD, id}),
        addShape: (name: string , x: number, y: number, w: number, h: number) => dispatch({ type:Actions.SHAPE_ADD, name, x, y, w, h})
    })
)(Canvas);
