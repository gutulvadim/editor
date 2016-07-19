import * as React from "react";

import { Palette } from "./Palette";
import  Canvas  from "./Canvas";

export interface PaneProps { }

export class Pane extends React.Component<PaneProps, {}> {
    render() {
        return (
            <div>
                <Palette />
                <Canvas />
            </div>
        );
    }
}
