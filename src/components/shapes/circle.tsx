import * as React from "react";
import { Shape } from './shape';

export class Circle extends Shape {
  render() {
    let radius = Math.min(this.props.height, this.props.width) / 2;
    return <circle cx={this.state.x} cy={this.state.y} r={radius}/>
  }
}
