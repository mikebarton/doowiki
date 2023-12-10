import { Flex, Box } from "@radix-ui/themes"
import { Outlet } from 'react-router-dom';

export default function () {

    return (
        <Flex direction={'row'} justify={'start'} align={'stretch'}>
            <Box width={"9"} height={"100%" }>
                <div></div>
            </Box>
            <Box width={"100%"} height={"100%" }>
                <Outlet/>
            </Box>
        </Flex>
    )
}