import { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import Navbar from "./Navbar";
import HeaderRight from "./HeaderRight";

const Header = () => {

    const [toggle, setToggle] = useState(false);

    return ( 
        <header className="header">

            <HeaderLeft setToggle={setToggle} toggle={toggle} />
            <Navbar setToggle={setToggle} toggle={toggle} />
            <HeaderRight />
            
        </header> 
     );
}
 
export default Header;