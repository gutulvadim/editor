import * as React from 'react';
import { Tool } from "./Tool";

export interface PaletteProps { }

export class Palette extends React.Component<PaletteProps, {}> {
    render() {
        var paletteStyle = {
            float: 'left',
            overflow: 'hidden',
            width:60 + 'px'
        }
        return (
            <div id="palette" style={paletteStyle}>
                <Tool id="rectangle">
                    <rect width="100%" height="100%"/>
                </Tool>
                <Tool id="circle">
                    <circle cx="50%" cy="50%" r="50%"/>
                </Tool>
                <Tool id="triangle">
                    <svg width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon points="50 0, 0 100, 100 100" pointerEvents="all" />
                    </svg>
                </Tool>
            </div>
        );
    }
}