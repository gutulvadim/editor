export default (state, action) => {
    switch (action.type) {
        case 'SHAPE_ADD':
            var id = state.nextShapeId;
            var shape = Object.assign({}, { id: id }, action);
            delete shape['type'];
            return Object.assign({}, state, { nextShapeId: id + 1, shapes: [...state.shapes, shape] });

        case 'SHAPE_CHANGE':
            var shape = state.shapes.filter(x => x.id === action.id)[0];
            var shape_index = state.shapes.indexOf(shape);
            var new_shape = Object.assign({}, shape, { x: action.x, y: action.y });
            var new_shapes = [...state.shapes];
            new_shapes[shape_index] = new_shape;
            console.log(shape);
            return Object.assign({}, state, { shapes: new_shapes });

        case 'SHAPE_BACK':
            var shape = state.shapes.filter(x => x.id === action.id)[0];
            var shape_index = state.shapes.indexOf(shape);
            if(shape_index==0 || state.shapes.length <= 1) return state;
            var new_shapes = [...state.shapes];
            [new_shapes[shape_index-1], new_shapes[shape_index]] = [new_shapes[shape_index], new_shapes[shape_index-1]];
            console.log(shape);
            return Object.assign({}, state, { shapes: new_shapes });

        case 'SHAPE_FORWARD':
            var shape = state.shapes.filter(x => x.id === action.id)[0];
            var shape_index = state.shapes.indexOf(shape);
            if(state.shapes.length <= 1 || shape_index==state.shapes.length-1) return state;
            var new_shapes = [...state.shapes];
            [new_shapes[shape_index+1], new_shapes[shape_index]] = [new_shapes[shape_index], new_shapes[shape_index+1]];
            console.log(shape);
            return Object.assign({}, state, { shapes: new_shapes });

        default:
            return state;
    }
}