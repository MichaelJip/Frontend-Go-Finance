import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingpageLayoutNavbar";
import { Fragment } from "react";

const LandingPageLayoutNavBar = () => {
  const router = useRouter();
  const session = useSession();
  const { dataProfile } = useLandingPageLayoutNavbar();
  return (
    <Navbar maxWidth="full" isBordered isBlurred={false} shouldHideOnScroll>
      <div className="2xl:container">
        <div className="flex items-center gap-8">
          <NavbarBrand as={Link} href={"/"}>
            <Image
              src={"/images/general/logo.svg"}
              alt="logo"
              width={100}
              height={50}
              className="cursor-pointer"
            />
          </NavbarBrand>
          <NavbarContent className="hidden lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavbarItem
                key={`nav-${item.label}`}
                as={Link}
                href={item.href}
                className={cn(
                  "font-medium text-default-700 hover:text-danger",
                  {
                    "font-bold text-danger-500": router.pathname === item.href,
                  },
                )}
              >
                {item.label}
              </NavbarItem>
            ))}
          </NavbarContent>
        </div>
        <NavbarContent justify="end">
          <NavbarMenuToggle className="lg:hidden" />
          <NavbarItem className="hidden lg:relative lg:flex">
            <Input
              isClearable
              className="w-[300px]"
              placeholder="Search Event"
              startContent={<CiSearch />}
              onClear={() => {}}
              onChange={() => {}}
            />
          </NavbarItem>

          {/* Desktop */}
          {session.status === "authenticated" ? (
            <NavbarItem className="hidden lg:block">
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    src={dataProfile?.profilePicture}
                    className="cursor-pointer"
                    showFallback
                  />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="admin"
                    href="/admin/dashboard"
                    className={cn({ hidden: dataProfile?.role !== "admin" })}
                  >
                    Admin
                  </DropdownItem>
                  <DropdownItem key="profile" href="/member/profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem key="signout" onPress={() => signOut()}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <div className="hidden lg:flex lg:gap-4">
              {BUTTON_ITEMS.map((item) => (
                <NavbarItem key={`button-${item.label}`}>
                  <Button
                    color="danger"
                    as={Link}
                    href={item.href}
                    variant={item.variant as ButtonProps["variant"]}
                  >
                    {item.label}
                  </Button>
                </NavbarItem>
              ))}
            </div>
          )}

          {/* Mobile */}
          <NavbarMenu className="gap-4 bg-white">
            {NAV_ITEMS.map((item) => (
              <NavbarMenuItem key={`nav-${item.label}`}>
                <Link
                  href={item.href}
                  className={cn(
                    "font-medium text-default-700 hover:text-danger",
                    {
                      "font-bold text-danger": router.pathname === item.href,
                    },
                  )}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}

            {session.status === "authenticated" ? (
              <Fragment>
                <NavbarMenuItem>
                  <Link
                    href={"/admin/dashboard"}
                    className={cn(
                      "font-medium text-default-700 hover:text-danger",
                      {
                        hidden: dataProfile?.role === "admin",
                      },
                    )}
                  >
                    Admin
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Link
                    href={"/member/profile"}
                    className={cn(
                      "font-medium text-default-700 hover:text-danger",
                    )}
                  >
                    Profile
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Button
                    color="danger"
                    onPress={() => signOut()}
                    className="mt-2 w-full"
                    variant="bordered"
                    size="md"
                  >
                    Log out
                  </Button>
                </NavbarMenuItem>
              </Fragment>
            ) : (
              <Fragment>
                {BUTTON_ITEMS.map((item) => (
                  <NavbarMenuItem key={`button-${item.label}`}>
                    <Button
                      color="danger"
                      as={Link}
                      href={item.href}
                      variant={item.variant as ButtonProps["variant"]}
                      fullWidth
                      size="md"
                    >
                      {item.label}
                    </Button>
                  </NavbarMenuItem>
                ))}
              </Fragment>
            )}
          </NavbarMenu>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default LandingPageLayoutNavBar;
