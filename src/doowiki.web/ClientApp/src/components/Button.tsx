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

export default styled(Button,
    {
        margin: '2px',
        padding: '2px',
        variants:{
            variant:{
                ghost:{
                    padding: 0,
                    border: 'none',
                    backgroundColor: 'inherit'
                },
                soft: {
                    backgroundColor: 'inherit',
                    borderRadius: '5px',
                    borderWidth: '1px'
                }
            }
        }
    });