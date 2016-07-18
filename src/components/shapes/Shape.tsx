import * as React from "react";
import render = __React.__DOM.render;
import { connect } from 'react-redux';

export interface IShape { x: number; y: number; width: number; height: number;
                          id: string; onChange:Function }

export class Shape extends React.Component<IShape, {}> {
    mouseMoveF:any = this.onMouseMove.bind(this);
    state = { id: this.props.id, eventDispatcher: this.props.onChange }

    startDrug() {
        document.addEventListener("mouseup", this.onMouseUp.bind(this));
        document.addEventListener("mousemove",  this.mouseMoveF);
    }

    onMouseMove(event:MouseEvent) {
        console.log(this.state.id);
        this.state.eventDispatcher('mouseMove', {id:this.state.id, x:event.pageX, y:event.pageY});
    }

    onMouseUp(event:MouseEvent) {
        document.removeEventListener("mousemove",  this.mouseMoveF);
    }

    dbClick(event:MouseEvent) {
        console.log('dbClick');
        this.state.eventDispatcher('dblClick', {id:this.state.id, isAlt:event.altKey});
    }
}
