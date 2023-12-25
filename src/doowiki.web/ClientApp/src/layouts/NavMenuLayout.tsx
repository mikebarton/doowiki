import React from 'react';
import { Box } from "@radix-ui/themes"
import { Flex } from '../components';
import { Outlet } from 'react-router-dom';
import NavMenu from "../widgets/NavMenu/NavMenu";
import AdminButton from "../widgets/AdminButton/AdminButton";
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
            width: '100%',
            overflow: 'auto'
        },
        navMenu: {
            backgroundColor: '$accented',
            color:'$accentedText',
            width: '400px'
        },
        mainPane: {
            backgroundColor: '$background'
        }
    }


    return (
        <Flex direction={'row'} justify={'flex-start'} align={'stretch'} height={'100vh'} className={css(styles.mainPane)()}>
            <Flex className={css(styles.navMenu)()} direction={'column'} justify={'flex-start'} align={'stretch'} gap={3} margin={[1]}>
                <NavMenu />
            </Flex>
            <Flex direction={'column'} justify={'flex-start'} align={'stretch'} className={css(styles.contentStyle)()}>
                <Flex justify={'flex-end'}>
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
