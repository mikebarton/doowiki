import { Flex, IconButton, Tooltip, Dialog, Button, Inset, Table, TableBody } from "@radix-ui/themes";
import { PersonIcon } from '@radix-ui/react-icons';
import CreateUserForm from "../CreateUserForm/CreateUserForm";


const AddUserButton = () => {

    return <Dialog.Root>
        <Dialog.Trigger>
            <IconButton variant="soft">
                <PersonIcon />
            </IconButton>
        </Dialog.Trigger>
        <Dialog.Content>
            <Dialog.Title>Add User</Dialog.Title>
            <CreateUserForm />
            <Dialog.Close>
                <Button>Close</Button>
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Root>
}


export default AddUserButton;