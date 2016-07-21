import * as React from 'react';
import { connect } from 'react-redux';
import { Actions } from "../reducers/shape_reducer";
import {IShape, Shape} from "./shapes/shape";
import {IShapeDispatcher} from "./shapes/shape";
import {ShapeFactory} from "./shapes/shape_factory";
import {IShapeData} from "./shapes/shape";

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
  generateShape(shapeData:IShapeData) {
    return ShapeFactory.createShape(shapeData, this.props);
  }

  render() {
    let shapes = this.props.shapes.map(this.generateShape.bind(this));

    return (
      <div className="canvas-container" onDrop={this.onCanvasDrop.bind(this)} onDragOver={this.onCanvasDragOver.bind(this)}>
        <svg className="canvas">{shapes}</svg>
      </div>
    );
  }

  onCanvasDrop(event:DragEvent) {
    event.preventDefault();
    this.props.addShape(
      event.dataTransfer.getData("shape"),
      event.pageX,
      event.pageY,
      this.props.shapeHeight,
      this.props.shapeWidth
    );
  }

  onCanvasDragOver(event:DragEvent) {
    event.preventDefault();
  }
}

export default connect(
  (state):ICanvasState => ({ shapes: state.shapes, shapeHeight: state.shapeHeight, shapeWidth: state.shapeWidth }),
  (dispatch):ICanvasDispatcher => ({
    moveShape: (id: number, x: number, y: number) => dispatch({ type:Actions.SHAPE_MOVE, id, x, y}),
    pushBack: (id: number) => dispatch({ type:Actions.SHAPE_BACK, id}),
    bringForward: (id: number) => dispatch({ type:Actions.SHAPE_FORWARD, id}),
    addShape: (name: string , x: number, y: number, width: number, height: number) =>
      dispatch({ type:Actions.SHAPE_ADD, name, x, y, width, height})
  })
)(Canvas);
