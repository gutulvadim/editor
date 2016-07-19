import * as React from 'react';
import { connect } from 'react-redux';
import { Circle } from "./shapes/Circle";
import { Square } from "./shapes/Square";
import { Triangle } from "./shapes/Triangle";
import { Shape } from "./shapes/Shape";
import {Actions} from "../reducers/ShapeReducer";
import {Event as ShapeEvent} from "./shapes/Shape";

class Canvas extends React.Component<any, any> {
    constructor(props?, context?) {
        super(props, context);
    }
    shapeAttributes(s) {
        return { x: s.x, y: s.y, width: s.w, height: s.h, key: s.id, id: s.id, onChange: this.onChange.bind(this)};
    }

    generateShape(shape_data) {
        let attributes = this.shapeAttributes(shape_data)
        switch (shape_data.name) {
            case 'circle':
                return <Circle {...attributes} />;
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

    onChange(event:ShapeEvent, target:any) {
        if (event == ShapeEvent.DROP) {
            this.props.updateShape(target.id, target.x, target.y);
        }
        if (event == ShapeEvent.DBL_CLICK) {
            console.log(target);
            if (target.isAlt) {
                this.props.moveBack(target.id);
            } else {
                this.props.moveForvard(target.id);
            }

        }
    }

    onCanvasDrop(ev) {
        console.log(ev.dataTransfer.getData("shape"));
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
        console.log('onCanvasDragOver');
        ev.preventDefault();
    }
}

export default connect(
    (state) => ({ shapes: state.shapes, shapeHeight: state.shapeHeight, shapeWidth: state.shapeWidth }),
    (dispatch) => ({
        updateShape: (id, x, y) => dispatch({ type:Actions.SHAPE_CHANGE, id, x, y}),
        moveBack: (id) => dispatch({ type:Actions.SHAPE_BACK, id}),
        moveForvard: (id) => dispatch({ type:Actions.SHAPE_FORWARD, id}),
        addShape: (name, x, y, w, h) => dispatch({ type:Actions.SHAPE_ADD, name, x, y, w, h})
    })
)(Canvas);