import * as React from "react";
import * as ReactDOM from "react-dom";

export interface IShapeDispatcher {
  moveShape?: (id: number, x: number, y: number) => void,
  bringForward?: (id: number) => void,
  pushBack?: (id: number) => void
}

export interface IShapeData {
  x: number; y: number; width: number; height: number; id: number; name?: string;
}

export interface IShape extends IShapeDispatcher, IShapeData {
}

export class Shape extends React.Component<IShape, {}> {
  private mouseMove: EventListener = this.onMouseMove.bind(this);
  private mouseUp: EventListener = this.onMouseUp.bind(this);
  private xDelta = 0;
  private yDelta = 0;

  state = { x: this.props.x, y: this.props.y }

  onMouseDown(event:MouseEvent) {
    if (event.which != 1) return;
    this.xDelta = this.state.x - event.layerX;
    this.yDelta = this.state.y - event.layerY;
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  }

  componentDidMount() {
    let domElement = ReactDOM.findDOMNode(this);
    domElement.addEventListener("mousedown", this.onMouseDown.bind(this));
    domElement.addEventListener("dblclick", this.dbClick.bind(this));
    domElement.classList.add("shape");
  }

  onMouseMove(event:MouseEvent) {
    if (Shape.isOnDocument(event.pageX, event.pageY)) {
      this.setState({x: event.layerX+this.xDelta, y: event.layerY+this.yDelta});
    }
  }

  onMouseUp(event:MouseEvent) {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    this.props.moveShape(this.props.id, this.state.x,  this.state.y);
  }

  dbClick(event:MouseEvent) {
    if (event.altKey) {
      this.props.pushBack(this.props.id);
    } else {
      this.props.bringForward(this.props.id);
    }
  }

  static isOnDocument(x:number, y:number) {
    return y > 0 && x > 0 &&
      x < document.body.clientWidth &&
      y < document.body.clientHeight;
  }
}
