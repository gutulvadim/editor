import * as React from 'react';
import { connect } from 'react-redux';
import { Circle } from "./shapes/Circle";
import { Rectangle } from "./shapes/Rectangle";
import { Triangle } from "./shapes/Triangle";

class Palette extends React.Component<any, any> {
    constructor(props?, context?) {
        super(props, context);
    }
    render() {
        return (<div></div>);
        /*(
            <div id="palette" className="panel1">

                <span draggable="true" onDragStart={this.onDragStart} id="circle" className="tool" >
                    <svg>
                        <Circle x={50} y={50} width={100} height={100} key={'palette_circle'} id={'palette_circle'}  />
                    </svg>
                </span>
                <span draggable="true" className="tool">
                    <svg>
                        <Rectangle x={50} y={50} width={100} height={100} key={'palette_rectangle'} id={'palette_rectangle'} />
                    </svg>
                </span>
                <span draggable="true" className="tool" x="200">
                    <svg>
                        <Triangle x={50} y={50} width={100} height={100} key={'palette_triangle'} id={'palette_triangle'} />
                    </svg>
                </span>
            </div>
        )*/
    }
    onDragStart(ev) {
        console.log("onDragStart");
        ev.dataTransfer.setData("text", ev.target.id);
    }
}

export default connect(
    (state) => ({ shapes: state.shapes }),
    (dispatch) => ({
        addShape: (id, x, y) => dispatch({ type:'SHAPE_CHANGE', id, x, y})
    })
)(Palette);