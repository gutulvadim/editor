import * as React from "react";
import {Shape} from "./shape";

export class Triangle extends Shape {
  render() {
    let top = `${this.state.x} ${this.state.y - this.props.height / 2}`;
    let left = `${this.state.x - this.props.width / 2} ${this.state.y + this.props.height / 2}`;
    let right = `${this.state.x + this.props.width / 2} ${this.state.y + this.props.height / 2}`;
    let points = `${top}, ${left}, ${right}`;
    return (
      <polygon points={ points }/>
    )
  }
}

