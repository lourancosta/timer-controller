import { HeaderContainer } from "./styles";

import logoIgnite from "../../assets/logo-timer-controller.svg";
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={32} />
        </NavLink>
        <NavLink to="/history " title="History">
          <Scroll size={32} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
