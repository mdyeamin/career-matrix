'use client';
import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  Briefcase,
  CirclePlus,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const DashboardSideBar = () => {
  const navItems = [
    { icon:  House, href:'/dashboard/recruiter', label: "Home" },
    { icon: Briefcase, href:'/dashboard/recruiter/jobs', label: "Jobs" },
    { icon: CirclePlus, href:'/dashboard/recruiter/jobs/new', label: "Create A Job" },
    { icon: CirclePlus, href:'/dashboard/recruiter/company', label: "Company Profile" },
    { icon: Envelope, href:'', label: "Messages" },
    { icon: Person, href:'', label: "Profile" },
    { icon: Gear, href:'', label: "Settings" },
  ];
  const path = usePathname()
  console.log(path);
  const navMenu = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
        href={item.href}
          key={item.label}
          className={`flex ${item.href === path && "bg-[#8D51FF]"} items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default`}
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
  return (
    <>
      <aside className="hidden md:block w-64 p-4 bg-[#1F1F23] rounded-lg">
        {navMenu}
      </aside>
      <Drawer>
        <Button className="md:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navMenu}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};

export default DashboardSideBar;
