import * as React from "react";

export interface ToolProps { id: string }

export class Tool extends React.Component<ToolProps, {}> {
  render() {
    return (
      <span draggable="true" className="tool" id={this.props.id} onDragStart={this.onDragStart}>
        <svg className="tool">
          before
            {this.props.children}
          after
        </svg>
      </span>
    );
  }
  onDragStart(ev) {
    ev.dataTransfer.setData("shape", ev.target.id);
  }
}
