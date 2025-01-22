type NavLink = {
  text: string;
  href: string;
};

export type NavLinksProps = NavLink[];

export interface HeaderProps {
  data: {
    links: NavLinksProps;
  };
}
