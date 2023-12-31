import React from 'react'
import { Button } from '../../components';
import { SunIcon } from '@radix-ui/react-icons';
import { css } from '../../themes';
import { ColorModeContext } from '../../utils/ColorModeProvider';

const ThemeSelector = ()=>{
    const [isDark, setIsDark] = React.useState<boolean>(false);
    const colorContext = React.useContext(ColorModeContext);
    React.useEffect(()=>{
        colorContext.setColourMode(isDark ? 'dark' : 'light');
    },[isDark])

    const styles={
        iconStyles: {
            color: '$slate11'
        }
    }

    return (<Button variant='soft' onClick={()=>setIsDark(!isDark)}>
        <SunIcon className={css(styles.iconStyles)()}/>
    </Button>)
}


export default ThemeSelector;