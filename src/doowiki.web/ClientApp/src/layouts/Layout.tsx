import { Outlet } from "react-router-dom";
import { Flex } from "../components";
export default function (){

    return (
        <Flex justify={'center'} align={'center'} height={'100%'}>
            <Outlet/>
        </Flex>
    )
}