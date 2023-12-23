import React from 'react';
import { IDivProps, DivStyleBuilder } from './Div';
import { css, styled } from '../themes';

interface ISpanProps extends IDivProps{

}
const Span = (props : ISpanProps)=>{
    const style = DivStyleBuilder(props)

    const elementProps = {
        className : `${props.className} ${css(style)()}`        
    }

    return React.createElement('span', elementProps, props.children )
}

export default styled(Span);