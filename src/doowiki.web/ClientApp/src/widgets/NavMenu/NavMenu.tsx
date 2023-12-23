import SpaceSelector from "../SpaceSelector/SpaceSelector";
import LogoutButton from "../LogoutButton/LogoutButton";
import DocumentTree from "../DocumentList/DocumentTree";
import AddDocumentButton from "../AddDocumentButton/AddDocumentButton";
import { Flex } from "@radix-ui/themes";
import ThemeSelector from "../ThemeSelector/ThemeSelector";

const NavMenu = () => {

    return (
        <>
            <SpaceSelector />
            <Flex justify={'between'}>
                <AddDocumentButton />
                <ThemeSelector/>
            </Flex>
            <DocumentTree />
            <Flex grow={'1'} align={'end'}>
                <LogoutButton />
            </Flex>
        </>
    )
}

export default NavMenu;