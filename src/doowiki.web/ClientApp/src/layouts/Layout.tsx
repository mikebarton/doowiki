import { Outlet } from "react-router-dom";
import { Flex, Box } from "@radix-ui/themes";

export default function (){

    return (
        <Flex justify={'center'} align={'center'} height={'100%'}>
            <Outlet/>
        </Flex>
    )
}