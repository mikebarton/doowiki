import React from 'react';
import { styled, css } from '../themes';
import { IDivProps, SpacingValues, DivStyleBuilder } from './Div';


interface IFlexProps extends IDivProps {
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse',
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse',    
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
    align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' |'space-between' | 'space-around' | 'space-evenly', 
    gap?: SpacingValues | undefined,
    asChild?: undefined | boolean,
    grow?: number,
    shrink?: number,
    order?: number,
}



const Flex  = (props : IFlexProps) => {

    const divStyles = DivStyleBuilder(props);
    const style = {
        ...divStyles,
        display: 'flex',
        flexDirection: props.direction || 'row',
        flexWrap: props.wrap || 'nowrap',
        justifyContent: props.justify || 'flex-start',
        alignContent: props.align || 'flex-start',
        flexGap: props.gap,
        flexGrow: props.grow || 0,
        boxSizing: 'border-box'
    }

    const elementProps = {
        className : `${props.className} ${css(style)()}`        
    }

    return React.createElement('div', elementProps, props.children )
}

export default styled(Flex);