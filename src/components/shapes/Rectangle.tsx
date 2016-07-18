import * as React from "react";
import { connect } from 'react-redux';
import {Shape} from "./Shape";

export class Rectangle extends Shape {
    render() {
        return <rect id={this.props.id} x={this.props.x} y={this.props.y} width={this.props.width}
                     height={this.props.height} stroke="white"
                     onMouseDown={this.startDrug.bind(this)}/>
    }
}

