import * as React from "react";
import { connect } from 'react-redux';
import {Shape} from "./Shape";

export class Rectangle extends Shape {
    render() {
        return <rect id={this.props.id} x={this.state.x - this.props.width/2} y={this.state.y - this.props.height/2} width={this.props.width}
                     height={this.props.height} className="shape"
                     onMouseDown={this.startDrug.bind(this)} onDoubleClick={this.dbClick.bind(this)}/>
    }
}
