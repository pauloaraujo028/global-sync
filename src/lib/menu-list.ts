import {
  Bookmark,
  FilePlus,
  LayoutGrid,
  LucideIcon,
  Settings,
  SquareCheckBig,
  SquarePen,
  Tag,
  User,
  Users,
} from "lucide-react";

type Role = "ADMIN" | "USER";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
  roles: Role[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

// export function getMenuList(pathname: string): Group[] {
export function getMenuList(role: Role): Group[] {
  const menuList: Group[] = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
          roles: ["ADMIN"],
        },
      ],
    },
    {
      groupLabel: "Menu",
      menus: [
        {
          href: "/dashboard/fiscal-notes",
          label: "Controle de Notas",
          icon: FilePlus,
          roles: ["ADMIN", "USER"],
        },
        {
          href: "/dashboard/tasks",
          label: "Tasks",
          icon: SquareCheckBig,
          roles: ["ADMIN"],
        },
        {
          href: "",
          label: "Posts",
          icon: SquarePen,
          submenus: [
            {
              href: "/dashboard/posts",
              label: "All Posts",
              icon: User,
            },
            {
              href: "/dashboard/posts/new",
              label: "New Post",
              icon: User,
            },
          ],
          roles: ["ADMIN"],
        },
        {
          href: "/dashboard/categories",
          label: "Categories",
          icon: Bookmark,
          roles: ["ADMIN"],
        },
        {
          href: "/dashboard/tags",
          label: "Tags",
          icon: Tag,
          roles: ["ADMIN"],
        },
        {
          href: "/dashboard/users",
          label: "Users",
          icon: Users,
          roles: ["ADMIN"],
        },
      ],
    },
    {
      groupLabel: "Others",
      menus: [
        {
          href: "/dashboard/settings",
          label: "Settings",
          icon: Settings,
          roles: ["ADMIN"],
        },
        // {
        //   href: "",
        //   label: "Settings",
        //   icon: Settings,
        //   submenus: [
        //     {
        //       href: "/dashboard/settings/",
        //       label: "Profile",
        //       icon: User,
        //     },
        //     {
        //       href: "/dashboard/settings/account",
        //       label: "Account",
        //       icon: Wrench,
        //     },
        //     {
        //       href: "/dashboard/settings/appearance",
        //       label: "Appearance",
        //       icon: Palette,
        //     },
        //     {
        //       href: "/dashboard/settings/notifications",
        //       label: "Notifications",
        //       icon: MessageSquareDot,
        //     },
        //     {
        //       href: "/dashboard/settings/display",
        //       label: "Display",
        //       icon: PanelTop,
        //     },
        //   ],
        //   roles: ["ADMIN", "USER"],
        // },
      ],
    },
  ];
  return menuList
    .map((group) => ({
      ...group,
      menus: group.menus.filter((menu) => menu.roles.includes(role)),
    }))
    .filter((group) => group.menus.length > 0);
}
