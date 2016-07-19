import * as React from "react";
import render = __React.__DOM.render;
import { connect } from 'react-redux';

export enum Event
{
    DROP,
    DBL_CLICK
}

export interface IShape { x: number; y: number; width: number; height: number;
                          id: string; onChange:Function }

export class Shape extends React.Component<IShape, {}> {
    mouseMoveF:any = this.onMouseMove.bind(this);
    moseUpF:any = this.onMouseUp.bind(this);
    state = { id: this.props.id, x: this.props.x, y: this.props.y, eventDispatcher: this.props.onChange }

    startDrug() {
        document.addEventListener("mouseup", this.moseUpF);
        document.addEventListener("mousemove",  this.mouseMoveF);
    }

    onMouseMove(event:MouseEvent) {
        if (event.pageX < document.body.clientWidth && event.pageY < document.body.clientHeight && event.pageY > 0 && event.pageX > 0) {
            this.setState({x: event.layerX, y: event.layerY});
        }
    }

    onMouseUp(event:MouseEvent) {
        document.removeEventListener("mousemove",  this.mouseMoveF);
        document.removeEventListener("mouseup",  this.moseUpF);
        this.state.eventDispatcher(Event.DROP, {id:this.state.id, x:event.layerX, y:event.layerY});
    }

    dbClick(event:MouseEvent) {
        this.state.eventDispatcher(Event.DBL_CLICK, {id:this.state.id, isAlt:event.altKey});
    }
}
