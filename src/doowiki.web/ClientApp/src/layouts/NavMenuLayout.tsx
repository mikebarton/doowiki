import React from 'react';
import { Flex, Div } from '../components';
import { Outlet } from 'react-router-dom';
import NavMenu from "../widgets/NavMenu/NavMenu";
import AdminButton from "../widgets/AdminButton/AdminButton";
import useSecurityApi from '../api/useSecurityApi';
import { styled, css } from '../themes';
import { ColorModeContext } from '../utils/ColorModeProvider';

const NavMenuLayout = () => {
    const securityApi = useSecurityApi();
    const colourContext = React.useContext(ColorModeContext)
    React.useEffect(() => {
        securityApi.LoadSession();
        colourContext.setColourMode('light');
    }, [])

    const styles = {
        navStyle: {
            width: '400px',
            // overflow: 'auto'
        },
        contentStyle: {
            width: '100%',
            overflow: 'auto'
        },
        navMenu: {
            backgroundColor: '$indigo9',
            color: '$slate4',
            width: '400px'
        },
        mainPane: {
            backgroundColor: '$indigo3',
            color: '$slate11'
        },
        headRow: {
            backgroundColor: '$indigo5'
        }
    }


    return (
        <Flex direction='column' height={'100vh'} align='stretch'>
            <Flex direction='row' justify={'flex-end'} grow={0} className={css(styles.headRow)()} padding={[1]}>
                <AdminButton />
            </Flex>
            <Flex direction={'row'} justify={'flex-start'} align={'stretch'} grow={1} className={css(styles.mainPane)()} height='100%'>

                <Flex className={css(styles.navMenu)()} direction={'column'} justify={'flex-start'} align={'stretch'} gap={3} >
                    <Div style={{ flexGrow: 1 }}><NavMenu /></Div>
                </Flex>

                <Flex direction={'column'} justify={'flex-start'} align={'stretch'} grow={1} height='100%'>
                    <Div height='100%' width='100%' className={css(styles.contentStyle)()}><Outlet /></Div>
                </Flex>

            </Flex>
        </Flex>
    )
}

export default styled(NavMenuLayout, {
    backgroundColor: '$'
});
