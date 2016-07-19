export enum Actions
{
    SHAPE_ADD,
    SHAPE_CHANGE,
    SHAPE_BACK,
    SHAPE_FORWARD
}

export default (state, action) => {
    switch (action.type) {
        case Actions.SHAPE_ADD:
            return addShape(state, action);

        case Actions.SHAPE_CHANGE:
            return changeShape(state, action);

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

function addShape(state, action) {
    let id = state.nextShapeId;
    let shape = Object.assign({}, {id: id}, action);
    shape.x -= state.paletteWidth;
    delete shape['type'];
    return Object.assign({}, state, {nextShapeId: id + 1, shapes: [...state.shapes, shape]});
}

function changeShape(state, action) {
    let shapeIndex = getShapeIndex(state.shapes, action.id);
    let new_shape = Object.assign({}, state.shapes[shapeIndex], {x: action.x, y: action.y});
    let new_shapes = [...state.shapes];
    new_shapes[shapeIndex] = new_shape;

    return Object.assign({}, state, {shapes: new_shapes});
}

function shapeBack(state, action) {
    let shapeIndex = getShapeIndex(state.shapes, action.id);
    if (shapeIndex == 0 || state.shapes.length <= 1) {
        return state;
    }
    let new_shapes = [...state.shapes];
    [new_shapes[shapeIndex - 1], new_shapes[shapeIndex]] = [new_shapes[shapeIndex], new_shapes[shapeIndex - 1]];

    return Object.assign({}, state, {shapes: new_shapes});
}

function shapeForward(state, action) {
    let shapeIndex = getShapeIndex(state.shapes, action.id);
    if (state.shapes.length <= 1 || shapeIndex == state.shapes.length - 1) {
        return state;
    }
    let new_shapes = [...state.shapes];
    [new_shapes[shapeIndex + 1], new_shapes[shapeIndex]] = [new_shapes[shapeIndex], new_shapes[shapeIndex + 1]];

    return Object.assign({}, state, {shapes: new_shapes});
}
