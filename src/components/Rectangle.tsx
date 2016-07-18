import * as React from "react";
import { connect } from 'react-redux';


export class Rectangle extends React.Component<any, any> {
    mouseMoveF:any = this.onMouseMove.bind(this);
    state = { id: this.props.id, p: this.props.p }
    render() {
        return <rect id={this.props.id} x={this.props.x} y={this.props.y} width={this.props.width}
                     height={this.props.height} stroke="white"
                     onMouseDown={this.startDrug.bind(this)}/>
    }

    startDrug() {
        document.addEventListener("mouseup", this.onMouseUp.bind(this));
        document.addEventListener("mousemove",  this.mouseMoveF);
    }

    onMouseMove(event:MouseEvent) {
        console.log(this.state.id);
        //dispatch({ type: 'SHAPE_CHANGE',id:this.props.id, x:this.props.x, y :this.props.y});
        this.state.p(this.state.id, event.pageX-50, event.pageY-50);
        // this.props.move(this.state.id, event.pageX-25, event.pageY-25);
    }

    onMouseUp(event:MouseEvent) {
        document.removeEventListener("mousemove",  this.mouseMoveF);
    }
}

