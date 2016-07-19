import * as React from "react";

export interface IShape { x: number; y: number; width: number; height: number; id: string;
                          onDrop: Function, onBringForward: Function, onPushBack: Function
}

export class Shape extends React.Component<IShape, {}> {
    mouseMove:EventListener = this.onMouseMove.bind(this);
    mouseUp:EventListener = this.onMouseUp.bind(this);
    state = { x: this.props.x, y: this.props.y }

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
        this.props.onDrop(this.props.id, event.layerX,  event.layerY);
    }

    dbClick(event:MouseEvent) {
        if (event.altKey) {
            this.props.onPushBack(this.props.id);
        } else {
            this.props.onBringForward(this.props.id);
        }
    }

    static isOnDocument(x:number, y:number) {
        return y > 0 && x > 0 &&
            x < document.body.clientWidth &&
            y < document.body.clientHeight;
    }
}
