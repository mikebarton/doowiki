import SpaceSelector from "../SpaceSelector/SpaceSelector";
import LogoutButton from "../LogoutButton/LogoutButton";
import DocumentTree from "../DocumentList/DocumentTree";
import AddDocumentButton from "../AddDocumentButton/AddDocumentButton";
import { Flex } from "../../components";
import ThemeSelector from "../ThemeSelector/ThemeSelector";

const NavMenu = () => {

    return (
        <>
            <SpaceSelector />
            <Flex justify={'space-between'}>
                <AddDocumentButton />
                <ThemeSelector/>
            </Flex>
            <DocumentTree />
            <Flex grow={1} align={'flex-end'}>
                <LogoutButton />
            </Flex>
        </>
    )
}

export default NavMenu;