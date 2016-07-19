import * as React from "react";
import { Shape } from './Shape';

export class Circle extends Shape {
    render() {
        let radius = Math.min(this.props.height, this.props.width) / 2;
        return <circle id={this.props.id} cx={this.state.x} cy={this.state.y} r={radius} className="shape"
                       onMouseDown={this.startDrug.bind(this)} onDoubleClick={this.dbClick.bind(this)}/>
    }
}
