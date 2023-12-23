import React from 'react';
import { styled, css } from '../themes';

type SpacingValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'auto';
type LayoutValue = [SpacingValues] | [SpacingValues, SpacingValues] | [SpacingValues, SpacingValues, SpacingValues, SpacingValues ]

interface IDivProps{
    className?: string,
    padding?: LayoutValue | undefined,
    margin? : LayoutValue | undefined,
    display? : 'none' | 'block' | 'inline' | 'inline-block' | undefined,
    width?: string | undefined,
    height?: string | undefined,
    children: React.ReactNode
}
const DivStyleBuilder = (props : IDivProps) => {
    const convertSpacingValue = (val : SpacingValues | undefined) : string | undefined =>{
        if (val == undefined)
            return undefined;

        if(val === 'auto')
            return val;

            return `${val * 10}px`
    }

    const styles = {
        display: props.display,
        padding: props.padding?.map(m=> convertSpacingValue(m)).join(' '),
        margin: props.margin?.map(m=> convertSpacingValue(m)).join(' '),
        width: props.width,
        height: props.height
    };

    return styles;
};

const Div = (props: IDivProps)=>{
    const style = DivStyleBuilder(props)

    const elementProps = {
        className : `${props.className} ${css(style)()}`        
    }

    return React.createElement('div', elementProps, props.children )
}

export default styled(Div);
export { DivStyleBuilder };
export type { SpacingValues, IDivProps  }