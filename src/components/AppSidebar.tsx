import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "@tanstack/react-router";
import { BookOpen, Film, LayoutDashboard, Settings, User } from "lucide-react"
import { use } from "react";

const menuItems = [
	{
		title: "Dashboard",
		routePath: "/",
		icon: () => <LayoutDashboard className="mr-3 h-4 w-4" />,
	},
	{
		title: "Recordings",
		routePath: "/recordings",
		icon: () => <Film className="mr-3 h-4 w-4" />,
	},
	{
		title: "Guides",
		routePath: "/guides",
		icon: () => <BookOpen className="mr-3 h-4 w-4" />,
	},
]

const footerItems = [
	{
		title: "Profile",
		routePath: "/profile",
		icon: () => <User className="mr-3 h-4 w-4" />,
	},
	{
		title: "Settings",
		routePath: "/settings",
		icon: () => <Settings className="mr-3 h-4 w-4" />,
	},
]

interface NavItemProps {
	to: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
	active?: boolean;
}

export function NavItem({ to, icon, children }: NavItemProps) {
	const { open } = useSidebar();

	return (
		<Link
			to={to}
			activeProps={{ className: 'bg-accent text-accent-foreground' }}
			inactiveProps={{ className: 'hover:bg-muted' }}
			className={cn(
				`flex items-center ${open ? 'px-4' : ''} py-2 text-sm font-medium rounded-md`,
			)}
		>
			{icon}
			{children}
		</Link>
	);
}

export const AppSidebar: React.FC = () => {
	const { open } = useSidebar();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="py-3">
				<div className="flex align-center justify-between">
					{open ? <h2 className="text-lg font-semibold pl-3">Guide Creator</h2> : null}
					<SidebarTrigger className="self-center" />
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map(({ title, icon, routePath }) => (
								<SidebarMenuItem key={title}>
									<SidebarMenuButton asChild={open}>
										<NavItem to={routePath} icon={icon()}>{open ? title : null}</NavItem>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<Separator />
			<SidebarFooter>
				<SidebarMenu>
					{footerItems.map(({ title, icon, routePath }) => (
						<SidebarMenuItem key={title}>
							<SidebarMenuButton asChild={open}>
								<NavItem to={routePath} icon={icon()}>{open ? title : null}</NavItem>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}