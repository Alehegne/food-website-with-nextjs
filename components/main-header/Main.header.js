import Link from "next/link";

import LogoImg from "@/assets/logo.png";
import classes from "./Main.header.module.css";
import Image from "next/image";
import BackgroundHeader from "./MainHeaderBackground";
import NavLink from "./NavLink";

export default function MainHeader() {
  return (
    <>
      <BackgroundHeader />

      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image
            src={LogoImg.src}
            alt="Logo Img"
            height="80"
            width="80"
            priority
          />
          A NEXTLEVEL FOOD
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodie Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
