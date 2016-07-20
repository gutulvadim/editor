import * as React from 'react';
import { Circle } from "./circle";
import { Square } from "./square";
import { Triangle } from "./triangle";
import {IShapeDispatcher} from "./shape";
import {IShapeData} from "./shape";
import Element = JSX.Element;

export class ShapeFactory {
  static createShape(shapeData:IShapeData, dispatcher:IShapeDispatcher):Element {
    console.log(dispatcher);
    let attributes = this.shapeAttributes(shapeData, dispatcher);

    switch (shapeData.name) {
      case 'circle':
        return <Circle { ...attributes }/>;
      case 'rectangle':
        return <Square { ...attributes } />;
      case 'triangle':
        return <Triangle { ...attributes } />;
    }
  }

  static shapeAttributes(s:IShapeData, dispatcher: IShapeDispatcher) {
    return { x: s.x, y: s.y, width: s.width, height: s.height, key: s.id, id: s.id,
      moveShape: dispatcher.moveShape, bringForward: dispatcher.bringForward, pushBack: dispatcher.pushBack };
  }
}