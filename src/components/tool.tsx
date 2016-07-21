import * as React from "react";

export interface ToolProps { id: string }

export class Tool extends React.Component<ToolProps, {}> {
  render() {
    return (
      <span draggable="true" className="tool" onDragStart={this.onDragStart.bind(this)}>
        <svg className="tool">
            {this.props.children}
        </svg>
      </span>
    );
  }
  onDragStart(event:DragEvent) {
    event.dataTransfer.setData("shape", this.props.id);
  }
}
