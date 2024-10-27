"use client";

import Link from "next/link"; 
import { usePathname } from "next/navigation";
import classes from "./nav-links.module.css"

export default function NavLink({href, children}) {
 
  //this hook gives you the currently active path, the part after the domain
  const path = usePathname();
  
  return (
    <Link
      href={href}
      className={ path.startsWith(href) 
        ? `${classes.link} ${classes.active}` 
        : classes.link
      }
    >
      {children}
    </Link>
  );
}
