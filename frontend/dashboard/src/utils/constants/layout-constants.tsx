// Import - default
import * as Io5Icons from "react-icons/io5";
// import { GiCartwheel, GiFullMotorcycleHelmet } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
// import { TfiNotepad } from "react-icons/tfi";
import { IoHomeOutline } from "react-icons/io5";
import { PiAddressBook } from "react-icons/pi";
import { BiPurchaseTag } from "react-icons/bi";
import { VscTools } from "react-icons/vsc";
import { GiMountainClimbing } from "react-icons/gi";
import { GoQuestion } from "react-icons/go";
import { IoEarthOutline } from "react-icons/io5";
import { TiGroupOutline } from "react-icons/ti";
import { TbCategory } from "react-icons/tb";
import { PiNotepad } from "react-icons/pi";
import { AiOutlineTags } from "react-icons/ai";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiDropdownList } from "react-icons/ri";

// Import - helpers
import { Image } from "@/helpers/components";

// Import - utils
import { NavItemSchema } from "@/utils/schemas/GlobalSchema";
import { getImageSrc } from "../methods/image-methods";
import { openWebUrl } from "../methods/app-methods";
// import * as images from "@/assets/images";

// Component for icon image
// const ImageIcon = ({ src, alt, divCss, imgCss }: any) => (
//   <Image
//     src={src}
//     alt={alt}
//     divCss={divCss ?? "w-[20px] h-[20px]"}
//     imgCss={imgCss}
//   />
// );

// Contains all of the sidebar items here
export const SIDEBAR_ITEMS: NavItemSchema[] = [
  {
    href: "no-href",
    label: (
      <div
        onClick={openWebUrl("/")}
        className="text-md text-center uppercase text-gray-300 hover:text-blue-300 hover:underline transition-all"
      >
        Open Website
      </div>
    ),
    child: [],
  },
  // Deals with the most common routes that a user can/should see at first
  {
    href: "/",
    label: "Portal",
    child: [
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,
        icon: <AiOutlineDashboard className="text-[22px]" />,
        label: "Dashboard",
        href: "dashboard",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
      // {
      //   icon: <MdOutlineCheckBox />,
      //   label: "Check in List",
      //   href: "check-in",
      //
      // },
    ],
  },
  {
    href: "/",
    label: "Quick settings",
    child: [
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,
        icon: <RiDropdownList className="text-[22px]" />,
        label: "Category Menu",
        href: "category_menu",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
      // {
      //   icon: <MdOutlineCheckBox />,
      //   label: "Check in List",
      //   href: "check-in",
      //
      // },
    ],
  },
  // {
  //   // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,
  //   icon: <TfiNotepad className="" />,
  //   label: "Home Page",
  //   href: "home",
  //   // roles: EDITOR_ROLES_ABOVE_NUMBER,
  // },
  {
    href: "contact",
    label: "Pages",
    child: [
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,

        icon: <IoHomeOutline className="" />,
        label: "Home",
        href: "home",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,
        icon: <PiAddressBook className="" />,
        label: "Contact",
        href: "contact",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,

        icon: <BiPurchaseTag className="" />,
        label: "Rental",
        href: "rental",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,

        icon: <VscTools className="" />,
        label: "Workshop",
        href: "workshop",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,

        icon: <GiMountainClimbing className="" />,
        label: "HST Pokhara",
        href: "hst_pokhara",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
    ],
  },
  {
    href: "about",
    label: "About",
    child: [
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,
        icon: <GoQuestion className="" />,
        label: "Why Us",
        href: "about/why-us",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,
        icon: <IoEarthOutline className="" />,
        label: "Social Responsibility",
        href: "about/social-responsibility",
      },
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,
        icon: <TiGroupOutline className="" />,
        label: "Our Team",
        href: "about/our-team",
      },
    ],
  },
  {
    href: "categories",
    label: "Posts",
    child: [
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,
        icon: <TbCategory className="" />,
        label: "Categories",
        href: "categories",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,
        icon: <AiOutlineTags className="" />,
        label: "Subcategories",
        href: "subcategories",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,
        icon: <AiOutlineTags className="" />,
        label: "Subcategories Draft",
        href: "subcategories-draft",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
    ],
  },
  {
    href: "blogs",
    label: "News",
    child: [
      {
        // icon: <ImageIcon src={images.hst_logo_png} alt="dashboard_svg" />,
        icon: <PiNotepad className="" />,
        label: "Blogs",
        href: "blogs",
        // roles: EDITOR_ROLES_ABOVE_NUMBER,
      },
    ],
  },
  // Deals with users
  // {
  //   href: "/groups",
  //   label: "Users",
  //   child: [
  //     {
  //       icon: <ImageIcon src={images.groups_svg} alt="groups_svg" />,
  //       label: "Groups",
  //       href: "groups",
  //     },
  //     {
  //       icon: <ImageIcon src={images.people_svg} alt="people_svg" />,
  //       label: "Staff",
  //       href: "staff",
  //     },
  //   ],
  // },
];

export const NOTIFICATION_ITEMS: NavItemSchema = {
  // label: "User Name",
  // caption: "Admin",
  icon: (
    <Io5Icons.IoNotificationsOutline className="text-xl text-brand-yellow-600" />
  ),
  href: "#",
  onClick: () => {},
  child: [
    {
      // icon: <MdOutlineEmail className="text-lg" />,
      label: "Inventory changes",
      value: "Some changes have been made inventory.",
      onClick: () => {},
      href: "#",
    },
    {
      // icon: <IoSettingsOutline className="text-lg" />,
      label: "Profile settings",
      value: "Updated User Profile settings.",
      onClick: () => {},
      href: "#",
    },
    {
      // icon: <IoLogOutOutline className="text-lg" />,
      label: "Requests",
      value: "Changed the requests & approvals of the site.",
      onClick: () => {},
      href: "#",
    },
  ],
};

export const USER_DROPDOWN_ITEMS = (params: any) => {
  // Params
  const { email, fullName, handleLogout, imageProfilePic, role } = params;
  return {
    label: fullName,
    caption: role,
    icon: (
      <Image
        src={getImageSrc(imageProfilePic)}
        alt="Profile image"
        divCss="p-0.5 w-10 h-10 rounded-full border-[2px] border-brand-yellow-600"
        imgCss="w-full h-full rounded-full object-cover"
      />
    ),
    href: "#",
    onClick: () => {},
    child: [
      {
        icon: <MdOutlineEmail className="text-lg" />,
        label: "Email",
        value: email,
        onClick: () => {},
        href: "#",
      },
      {
        icon: <Io5Icons.IoSettingsOutline className="text-lg" />,
        label: "Settings",
        value: "Settings",
        onClick: () => {},
        href: "settings",
      },
      {
        icon: <Io5Icons.IoLogOutOutline className="text-lg" />,
        label: "Logout",
        value: "Logout",
        onClick: handleLogout,
      },
    ],
  };
};
