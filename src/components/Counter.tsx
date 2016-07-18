import * as React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component<any, any> {
    render() {
        var field = this.props.field, step = this.props.step || 1;
        return (
            <div>
                <p>
                    <label>{this.props.field1}: </label>
                    <label>{this.props.x}: </label>
                    <label>{this.props.step1}: </label>
                    <b>{this.props.counter}</b>
                </p>
                <button style={{width:30, margin:2}} onClick={e => this.props.decr('x', 'width',  step, this.props.step1)}>-</button>
                <button style={{width:30, margin:2}} onClick={e => this.props.incr('x', 'width', step, this.props.step1)}>+</button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({ step1: state['x'] || 0,  counter: state['width'] || 0  });

const mapDispatchToProps = (dispatch) => ({
    incr: (x, width, step, step1) => {
        dispatch({ type: 'COUNTER_CHANGE', x,width, by: step , by1: step1});
    },
    decr: (x,width, step, step1) => {
        dispatch({ type: 'COUNTER_CHANGE',x,width, by: -1 * step, by1: step1 });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);