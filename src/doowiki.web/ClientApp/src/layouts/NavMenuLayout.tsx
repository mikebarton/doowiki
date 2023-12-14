import { Flex, Box } from "@radix-ui/themes"
import { Outlet } from 'react-router-dom';
import NavMenu from "../components/NavMenu/NavMenu";

const NavMenuLayout = () => {
    const styles = {
        navStyle: {
            width: '300px'
        }
    }

    return (
        <Flex direction={'row'} justify={'start'} align={'stretch'}>
            <Flex direction={'column'} justify={'start'} align={'stretch'} style={styles.navStyle} gap={'3'} m={'3'}>
                <NavMenu/>
            </Flex>
            <Flex direction={'column'} justify={'start'} align={'stretch'}>
                <Box width={"100%"} >
                    <h1>Doowiki</h1>
                </Box>
                <Outlet/>
            </Flex>
            
        </Flex>
    )
}

export default NavMenuLayout;
