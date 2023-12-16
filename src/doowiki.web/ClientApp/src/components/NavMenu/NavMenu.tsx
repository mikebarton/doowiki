import SpaceSelector from "../SpaceSelector/SpaceSelector";
import LogoutButton from "../LogoutButton/LogoutButton";
import DocumentTree from "../DocumentList/DocumentTree";
import AddDocumentButton from "../AddDocumentButton/AddDocumentButton";


const NavMenu = () => {
    
    return (
        <>
            <SpaceSelector/>
            <AddDocumentButton />
            <DocumentTree/>
            <LogoutButton/>
        </>
    )
}

export default NavMenu;