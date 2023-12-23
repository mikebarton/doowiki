import AddUserButton from "./EditUserButton";
import { Flex } from "@radix-ui/themes";


const UserToolbar = ()=>{

    return <Flex gap={'2'}>
        <AddUserButton/>
    </Flex>
}

export default UserToolbar;