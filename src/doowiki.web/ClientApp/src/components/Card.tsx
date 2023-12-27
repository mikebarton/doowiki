import React from 'react';
import { styled, css } from '../themes';
import { IDivProps, DivStyleBuilder } from './Div';

interface ICardProps extends IDivProps{

}

const Card = ( props : ICardProps)=>{
    let style = DivStyleBuilder(props)
    style = {
        ...style,
        boxShadow: '5px 5px 5px 5px grey'
    }

    const elementProps = {
        className : `${props.className} ${css(style)()}`,
        style: props.style    
    }

    return React.createElement('div', elementProps, props.children )
}

export default styled(Card);
export type { ICardProps  }