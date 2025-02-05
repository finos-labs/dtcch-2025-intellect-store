import Link from "next/link";
import { Home, List } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logout } from "@/components/actions/logout-action";
import React from "react";

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface PageHeadingProps {
  breadcrumbs: BreadcrumbItem[];
  userInitial?: string;
}

export function PageHeading({ 
  breadcrumbs = [],
  userInitial = "U",
}: PageHeadingProps) {
  return (
    <header className="flex justify-between items-center mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={item.path}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={item.path} className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400">
              <Avatar>
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="bottom">
            <DropdownMenuItem>
              <Link
                href="/support"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={logout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
} 