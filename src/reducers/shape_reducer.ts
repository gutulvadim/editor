import { IShapeData } from '../components/shapes/shape';
import { ICanvasState } from '../components/canvas';

export enum Actions {
  SHAPE_ADD,
  SHAPE_MOVE,
  SHAPE_BACK,
  SHAPE_FORWARD
}

export interface IShapeAction extends IShapeData {
  type: Actions;
}

export interface IShapeState extends ICanvasState { 
  nextShapeId: number;
  paletteWidth: number;
}

export default (state: IShapeState, action: IShapeAction): IShapeState => {
  switch (action.type) {
    case Actions.SHAPE_ADD:
      return addShape(state, action);

    case Actions.SHAPE_MOVE:
      return moveShape(state, action);

    case Actions.SHAPE_BACK:
      return shapeBack(state, action);

    case Actions.SHAPE_FORWARD:
      return shapeForward(state, action);

    default:
      return state;
  }
}

function getShapeIndex(shapes, id) {
  let shape = shapes.filter(shape => shape.id === id)[0];

  return shapes.indexOf(shape);
}

function addShape(state: IShapeState, action: IShapeAction): IShapeState {
  let id = state.nextShapeId;
  let shape = Object.assign({}, {id: id}, action);
  shape.x -= state.paletteWidth;
  delete shape['type'];
  return Object.assign({}, state, {nextShapeId: id + 1, shapes: [...state.shapes, shape]});
}

function moveShape(state: IShapeState, action: IShapeAction): IShapeState {
  let shapeIndex = getShapeIndex(state.shapes, action.id);
  let newShape = Object.assign({}, state.shapes[shapeIndex], {x: action.x, y: action.y});
  let newShapes = [...state.shapes];
  newShapes[shapeIndex] = newShape;

  return Object.assign({}, state, {shapes: newShapes});
}

function shapeBack(state: IShapeState, action: IShapeAction): IShapeState {
  let shapeIndex = getShapeIndex(state.shapes, action.id);
  if (shapeIndex == 0 || state.shapes.length <= 1) {
    return state;
  }
  let newShapes = [...state.shapes];
  [newShapes[shapeIndex - 1], newShapes[shapeIndex]] = [newShapes[shapeIndex], newShapes[shapeIndex - 1]];

  return Object.assign({}, state, {shapes: newShapes});
}

function shapeForward(state: IShapeState, action: IShapeAction): IShapeState {
  let shapeIndex = getShapeIndex(state.shapes, action.id);
  if (state.shapes.length <= 1 || shapeIndex == state.shapes.length - 1) {
    return state;
  }
  let newShapes = [...state.shapes];
  [newShapes[shapeIndex + 1], newShapes[shapeIndex]] = [newShapes[shapeIndex], newShapes[shapeIndex + 1]];

  return Object.assign({}, state, {shapes: newShapes});
}
