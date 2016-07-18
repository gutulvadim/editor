import * as React from 'react';
import { connect } from 'react-redux';
import { Circle } from "./shapes/Circle";
import { Rectangle } from "./shapes/Rectangle";
import { Triangle } from "./shapes/Triangle";

class Canvas extends React.Component<any, any> {
    constructor(props?, context?) {
        super(props, context);
    }
    render() {

        var shapes = this.props.shapes.map(function(s) {{}
            switch (s.name) {
                case 'circle': return <Circle x={s.x} y={s.y} width={s.w} height={s.h} key={s.id} id={s.id} onChange={this.onChange.bind(this)} />;
                case 'rectangle': return <Rectangle x={s.x} y={s.y} width={s.w} height={s.h} key={s.id} id={s.id} onChange={this.onChange.bind(this)} />;
                case 'triangle': return <Triangle x={s.x} y={s.y} width={s.w} height={s.h} key={s.id} id={s.id} onChange={this.onChange.bind(this)} />;
            }
        }.bind(this));

        return (
            <div className="canvas-container" onDrop={this.onCanvasDrop.bind(this)} onDragOver={this.onCanvasDragOver.bind(this)}>
                <svg className="canvas">{shapes}</svg>
            </div>
        );
    }

    onChange(event:String, target:any) {
        if (event == "mouseMove") {
            this.props.updateShape(target.id, target.x, target.y);
        }
        if (event == "dblClick") {
            console.log(target);
            if (target.isAlt) {
                this.props.moveBack(target.id);
            } else {
                this.props.moveForvard(target.id);
            }

        }
    }

    onCanvasDrop(ev) {
        console.log(ev.dataTransfer.getData("shape"));
        ev.preventDefault();
        this.props.addShape(
            ev.dataTransfer.getData("shape"),
            ev.pageX,
            ev.pageY,
            100,
            100
        );
    }

    onCanvasDragOver(ev) {
        console.log('onCanvasDragOver');
        ev.preventDefault();
    }
}

export default connect(
    (state) => ({ shapes: state.shapes }),
    (dispatch) => ({
        updateShape: (id, x, y) => dispatch({ type:'SHAPE_CHANGE', id, x, y}),
        moveBack: (id) => dispatch({ type:'SHAPE_BACK', id}),
        moveForvard: (id) => dispatch({ type:'SHAPE_FORWARD', id}),
        addShape: (name, x, y, w, h) => dispatch({ type:'SHAPE_ADD', name, x, y, w, h})
    })
)(Canvas);