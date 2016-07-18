import * as React from "react";

export interface ToolProps { id: string }

export class Tool extends React.Component<ToolProps, {}> {
    render() {
        var toolStyle = {
            overflow: 'hidden',
            width: 40 + 'px',
            height: 40 + 'px',
            padding: 1 + 'px',
            display: 'inline-block',
            cursor: 'move'
        };
        var toolShapeStyle = {
            width: 30 + 'px',
            height: 30 + 'px',
            display: 'block',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'move',
            left: 5 + 'px',
            top: 5 + 'px'
        }
        return (
            <span draggable="true" style={toolStyle} id={this.props.id} onDragStart={this.onDragStart}>
                <svg style={toolShapeStyle}>
                    <svg height="100%" width="100%">
                        before
                            {this.props.children}
                        after
                    </svg>
                </svg>
            </span>
        );
    }
    onDragStart(ev) {
        ev.dataTransfer.setData("shape", ev.target.id);
        console.log('onDragStart');
    }
}