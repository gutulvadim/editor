import * as React from 'react';
import { Circle } from "./Circle";
import { Square } from "./Square";
import { Triangle } from "./Triangle";
import {IShape} from "./Shape";
import {Shape} from "./Shape";
import {IShapeDispatcher} from "./Shape";
import Component = __React.Component;
import {IShapeData} from "./Shape";
import Element = JSX.Element;

export class ShapeFactory {
    static createShape(shape_data:IShapeData, dispatcher:IShapeDispatcher):Element {
        let attributes = this.shapeAttributes(shape_data, dispatcher);

        switch (shape_data.name) {
            case 'circle':
                return <Circle { ...attributes }/>;
            case 'rectangle':
                return <Square { ...attributes } />;
            case 'triangle':
                return <Triangle { ...attributes } />;
        }
    }

    static shapeAttributes(s, dispatcher: IShapeDispatcher) {
        return { x: s.x, y: s.y, width: s.w, height: s.h, key: s.id, id: s.id,
            moveShape: dispatcher.moveShape, bringForward: dispatcher.bringForward, pushBack: dispatcher.pushBack };
    }
}