import SpaceSelector from "../SpaceSelector/SpaceSelector";
import LogoutButton from "../LogoutButton/LogoutButton";
import DocumentList from "../DocumentList/DocumentList";


const NavMenu = () => {
    
    return (
        <>
            <SpaceSelector/>
            <DocumentList/>
            <LogoutButton/>
        </>
    )
}

export default NavMenu;