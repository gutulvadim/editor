import * as React from "react";
import render = __React.__DOM.render;
import { connect } from 'react-redux';

export interface ICircle { x: number; y: number; r : number }

export class Circle extends React.Component<any, any> {
    mouseMoveF:any = this.onMouseMove.bind(this);
    state = { id: this.props.id, p: this.props.p }
    render() {
        return <circle id={this.props.id} cx={this.props.x} cy={this.props.y} r={this.props.r}
                       className="draggable" stroke="white" onMouseDown={this.startDrug.bind(this)}/>
    }

    startDrug() {
        document.addEventListener("mouseup", this.onMouseUp.bind(this));
        document.addEventListener("mousemove",  this.mouseMoveF);
    }

    onMouseMove(event:MouseEvent) {
        console.log(this.state.id);
        //dispatch({ type: 'SHAPE_CHANGE',id:this.props.id, x:this.props.x, y :this.props.y});
        this.state.p(this.state.id, event.pageX-25, event.pageY-25);
       // this.props.move(this.state.id, event.pageX-25, event.pageY-25);
    }

    onMouseUp(event:MouseEvent) {
        document.removeEventListener("mousemove",  this.mouseMoveF);
    }
}
/*
const mapStateToProps = (state, props) => ({ x: state['x'] || 0,  y: state['y'] || 0});

const mapDispatchToProps = (dispatch) => ({
    move: (id, x, y) => {
        dispatch({ type: 'SHAPE_CHANGE',id:id, x:x, y :y});
       // dispatch({ type: 'POSITION_CHANGE',id:id, x:x, y :y});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Circle);
*/
