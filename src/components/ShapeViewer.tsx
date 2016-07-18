import * as React from 'react';
import { connect } from 'react-redux';
import { Circle } from "./shapes/Circle";
import { Rectangle } from "./shapes/Rectangle";
import { Triangle } from "./shapes/Triangle";

class ShapeViewer extends React.Component<any, any> {
    constructor(props?, context?) {
        super(props, context);
    }
    render() {
        var shapes = this.props.shapes.map(function(s) {{}
            switch (s.name) {
                case 'circle': return <Circle x={s.x} y={s.y} r={s.r} key={s.id} id={s.id} p={this.props.updateShape} />;
                case 'rectangle': return <Rectangle x={s.x} y={s.y} width={s.w} height={s.h} key={s.id} id={s.id} p={this.props.updateShape} />;
                case 'triangle': return <Triangle x={s.x} y={s.y} width={s.w} height={s.h} key={s.id} id={s.id} p={this.props.updateShape} />;
            }
        }.bind(this));

        return(<svg>{shapes}</svg>);
    }
}

export default connect(
    (state) => ({ shapes: state.shapes }),
    (dispatch) => ({
        updateShape: (id, x, y) => dispatch({ type:'SHAPE_CHANGE', id, x, y})
    })
)(ShapeViewer);