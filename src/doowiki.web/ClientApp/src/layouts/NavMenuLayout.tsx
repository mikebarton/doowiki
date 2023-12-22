import React from 'react';
import { Flex, Box } from "@radix-ui/themes"
import { Outlet } from 'react-router-dom';
import NavMenu from "../components/NavMenu/NavMenu";
import AdminButton from "../components/AdminButton/AdminButton";
import useSecurityApi from '../api/useSecurityApi';
import { styled, css } from '../themes';
import { ColorModeContext } from '../utils/ColorModeProvider';

const NavMenuLayout = () => {
    const securityApi = useSecurityApi();
    const colourContext= React.useContext(ColorModeContext)
    React.useEffect(() => {
        securityApi.LoadSession();
        colourContext.setColourMode('light');
    }, [])

    const styles = {
        navStyle: {
            width: '400px'
        },
        contentStyle: {
            width: '100%'
        },
        navMenu: {
            backgroundColor: '$accented',
            color:'$accentedText'
        },
        mainPane: {
            backgroundColor: '$background'
        }
    }


    return (
        <Flex direction={'row'} justify={'start'} align={'stretch'} height={'100%'} className={css(styles.mainPane)()}>
            <Flex className={css(styles.navMenu)()} direction={'column'} justify={'start'} align={'stretch'} style={styles.navStyle} gap={'3'} m={'3'}>
                <NavMenu />
            </Flex>
            <Flex direction={'column'} justify={'start'} align={'stretch'} className={css(styles.contentStyle)()}>
                <Flex justify={'end'}>
                    <AdminButton />
                </Flex>
                <Box width={'100%'} height={'100%'}><Outlet /></Box>
            </Flex>

        </Flex>
    )
}

export default styled(NavMenuLayout, {
    backgroundColor: '$'
});
