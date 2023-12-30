import React from 'react';

type HeadingSize = 1 | 2 | 3 | 4 | 5;
interface IHeadingProps{
    size? : HeadingSize | undefined,
    className?: string | undefined,
    children: React.ReactNode
}
const Heading = ({size, children, className}: IHeadingProps) => {

    const HeadingElement = ({children} : { children: React.ReactNode})=>{
        const elem = React.createElement(`h${size || 1}`, { className: className}, children);

        return elem;
    } 

    return <HeadingElement>{children}</HeadingElement>
}

export default Heading;
