import SpaceSelector from "../SpaceSelector/SpaceSelector";
import LogoutButton from "../LogoutButton/LogoutButton";
import DocumentList from "../DocumentList/DocumentList";
import AddDocumentButton from "../AddDocumentButton/AddDocumentButton";


const NavMenu = () => {
    
    return (
        <>
            <SpaceSelector/>
            <AddDocumentButton />
            <DocumentList/>
            <LogoutButton/>
        </>
    )
}

export default NavMenu;