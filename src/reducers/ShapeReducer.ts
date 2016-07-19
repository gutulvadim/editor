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

function addShape(state, action) {
    let id = state.nextShapeId;
    let shape = Object.assign({}, { id: id }, action);
    shape.x -= state.paletteWidth;
    delete shape['type'];
    return Object.assign({}, state, { nextShapeId: id + 1, shapes: [...state.shapes, shape] });
}

function changeShape(state, action) {
    let shape = state.shapes.filter(x => x.id === action.id)[0];
    let shape_index = state.shapes.indexOf(shape);
    let new_shape = Object.assign({}, shape, { x: action.x, y: action.y });
    let new_shapes = [...state.shapes];
    new_shapes[shape_index] = new_shape;
    console.log(shape);
    return Object.assign({}, state, { shapes: new_shapes });
}

function shapeBack(state, action) {
    let shape = state.shapes.filter(x => x.id === action.id)[0];
    let shape_index = state.shapes.indexOf(shape);
    if(shape_index==0 || state.shapes.length <= 1) return state;
    let new_shapes = [...state.shapes];
    [new_shapes[shape_index-1], new_shapes[shape_index]] = [new_shapes[shape_index], new_shapes[shape_index-1]];
    console.log(shape);
    return Object.assign({}, state, { shapes: new_shapes });
}

function shapeForward(state, action) {
    let shape = state.shapes.filter(x => x.id === action.id)[0];
    let shape_index = state.shapes.indexOf(shape);
    if(state.shapes.length <= 1 || shape_index==state.shapes.length-1) return state;
    let new_shapes = [...state.shapes];
    [new_shapes[shape_index+1], new_shapes[shape_index]] = [new_shapes[shape_index], new_shapes[shape_index+1]];
    console.log(shape);
    return Object.assign({}, state, { shapes: new_shapes });
}