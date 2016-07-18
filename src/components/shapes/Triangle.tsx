import * as React from "react";
import { connect } from 'react-redux';
import {Shape} from "./Shape";

export class Triangle extends Shape {
    render() {
        let top = `${this.props.x} ${this.props.y - this.props.height / 2}`;
        let left = `${this.props.x - this.props.width/2} ${this.props.y + this.props.height / 2}`;
        let right = `${this.props.x + this.props.width/2} ${this.props.y + this.props.height / 2}`;
        let points = `${top}, ${left}, ${right}`;
        return <polygon points={ points } stroke="white" onMouseDown={this.startDrug.bind(this)} onDoubleClick={this.dbClick.bind(this)}/>
    }
}

