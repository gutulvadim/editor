import * as React from 'react';
import { Tool } from "./Tool";

export interface PaletteProps { }

export class Palette extends React.Component<PaletteProps, {}> {
    render() {
        return (
            <div id="palette" className="palette">
                <Tool id="rectangle">
                    <rect width="100%" height="100%" className="shape"/>
                </Tool>
                <Tool id="circle">
                    <circle cx="50%" cy="50%" r="50%" className="shape"/>
                </Tool>
                <Tool id="triangle">
                    <svg width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon points="50 0, 0 100, 100 100" className="shape"/>
                    </svg>
                </Tool>
            </div>
        );
    }
}
