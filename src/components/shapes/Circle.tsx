import * as React from "react";
import render = __React.__DOM.render;
import { connect } from 'react-redux';
import { Shape } from './Shape';

export class Circle extends Shape {
    render() {
        let radius = Math.min(this.props.height, this.props.width) / 2;
        return <circle id={this.props.id} cx={this.props.x} cy={this.props.y} r={radius}
                       className="draggable" stroke="white" onMouseDown={this.startDrug.bind(this)}/>
    }
}
