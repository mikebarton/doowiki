import { Flex, Box } from "@radix-ui/themes"
import { Outlet } from 'react-router-dom';
import NavMenu from "../components/NavMenu/NavMenu";

const NavMenuLayout = () => {
    const styles = {
        navStyle: {
            width: '300px'
        },
        contentStyle: {
            width: '100%'
        }
    }

    return (
        <Flex direction={'row'} justify={'start'} align={'stretch'} height={'100%'}>
            <Flex direction={'column'} justify={'start'} align={'stretch'} style={styles.navStyle} gap={'3'} m={'3'}>
                <NavMenu/>
            </Flex>
            <Flex direction={'column'} justify={'start'} align={'stretch'} style={styles.contentStyle}>
                <Box width={"100%"} >
                    <h1>Doowiki</h1>
                </Box>
                <Box width={'100%'} height={'100%'}><Outlet /></Box>
            </Flex>
            
        </Flex>
    )
}

export default NavMenuLayout;
