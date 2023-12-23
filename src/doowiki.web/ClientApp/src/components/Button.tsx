import React from 'react';
import { IDivProps, DivStyleBuilder } from './Div';
import { css, styled } from '../themes';

interface IButtonProps extends IDivProps{
    onClick?: () => void | undefined
}

const Button = (props : IButtonProps) => {
    const style = DivStyleBuilder(props)

    const elementProps = {
        className : `${props.className} ${css(style)()}` ,
        onClick: props.onClick       
    }

    return React.createElement('button', elementProps, props.children )
}

export default styled(Button);