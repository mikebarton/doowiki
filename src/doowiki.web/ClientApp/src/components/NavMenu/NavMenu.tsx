import SpaceSelector from "../SpaceSelector/SpaceSelector";
import LogoutButton from "../LogoutButton/LogoutButton";
import DocumentTree from "../DocumentList/DocumentTree";
import AddDocumentButton from "../AddDocumentButton/AddDocumentButton";
import { Flex } from "@radix-ui/themes";


const NavMenu = () => {

    return (
        <>
            <SpaceSelector />
            <AddDocumentButton />
            <DocumentTree />
            <Flex grow={'1'} align={'end'}>
                <LogoutButton />
            </Flex>
        </>
    )
}

export default NavMenu;