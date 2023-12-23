import React from 'react'

interface IEmProps
{
    children: React.ReactNode,
    className?: string | undefined
}
const Em = (props: IEmProps )=>{

    return React.createElement('em', { className: props.className}, props.children)
}

export default Em;

