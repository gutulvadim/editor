import * as React from "react";
import render = __React.__DOM.render;
import { connect } from 'react-redux';

export interface IShape { x: number; y: number; width: number; height: number;
                          id: number; onChange:Function }

export class Shape extends React.Component<IShape, {}> {
    mouseMoveF:any = this.onMouseMove.bind(this);
    state = { id: this.props.id, p: this.props.onChange }

    startDrug() {
        document.addEventListener("mouseup", this.onMouseUp.bind(this));
        document.addEventListener("mousemove",  this.mouseMoveF);
    }

    onMouseMove(event:MouseEvent) {
        console.log(this.state.id);
        this.state.p(this.state.id, event.pageX, event.pageY);
    }

    onMouseUp(event:MouseEvent) {
        document.removeEventListener("mousemove",  this.mouseMoveF);
    }
}
