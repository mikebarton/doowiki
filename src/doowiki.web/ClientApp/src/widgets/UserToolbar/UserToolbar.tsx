import AddUserButton from "./EditUserButton";
import { Flex } from "../../components";


const UserToolbar = ()=>{

    return <Flex gap={2}>
        <AddUserButton/>
    </Flex>
}

export default UserToolbar;