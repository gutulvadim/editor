import * as React from 'react';
import { Circle } from "./circle";
import { Square } from "./square";
import { Triangle } from "./triangle";
import {IShapeDispatcher} from "./shape";
import {IShapeData} from "./shape";
import Element = JSX.Element;

export class ShapeFactory {
  static createShape(shapeData:IShapeData, dispatcher:IShapeDispatcher):Element {
    let attributes = Object.assign({}, shapeData, dispatcher);

    switch (shapeData.name) {
      case 'circle':
        return <Circle { ...attributes }/>;
      case 'rectangle':
        return <Square { ...attributes } />;
      case 'triangle':
        return <Triangle { ...attributes } />;
    }
  }
}
