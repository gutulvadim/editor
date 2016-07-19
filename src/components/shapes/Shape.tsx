import * as React from "react";

export enum Event { DROP, DBL_CLICK }

export interface IShape { x: number; y: number; width: number; height: number;
                          id: string; onChange:Function
}

export class Shape extends React.Component<IShape, {}> {
    mouseMove:EventListener = this.onMouseMove.bind(this);
    mouseUp:EventListener = this.onMouseUp.bind(this);
    state = { x: this.props.x, y: this.props.y, eventDispatcher: this.props.onChange }

    startDrug() {
        document.addEventListener("mouseup", this.mouseUp);
        document.addEventListener("mousemove", this.mouseMove);
    }

    onMouseMove(event:MouseEvent) {
        if (Shape.isOnDocument(event.pageX, event.pageY)) {
            this.setState({x: event.layerX, y: event.layerY});
        }
    }

    onMouseUp(event:MouseEvent) {
        document.removeEventListener("mousemove", this.mouseMove);
        document.removeEventListener("mouseup", this.mouseUp);
        this.state.eventDispatcher(Event.DROP, {id: this.props.id, x: event.layerX, y: event.layerY});
    }

    dbClick(event:MouseEvent) {
        this.state.eventDispatcher(Event.DBL_CLICK, {id: this.props.id, isAlt: event.altKey});
    }

    static isOnDocument(x:number, y:number) {
        return y > 0 && x > 0 &&
            x < document.body.clientWidth &&
            y < document.body.clientHeight;
    }
}
