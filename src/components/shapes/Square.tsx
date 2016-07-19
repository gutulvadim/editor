import * as React from "react";
import {Shape} from "./Shape";

export class Square extends Shape {
    render() {
        return (
            <rect id={this.props.id} className="shape"
                  x={this.state.x - this.props.width/2}
                  y={this.state.y - this.props.height/2}
                  width={this.props.width}
                  height={this.props.height}
                  onMouseDown={this.startDrug.bind(this)} onDoubleClick={this.dbClick.bind(this)}/>
        )
    }
}
