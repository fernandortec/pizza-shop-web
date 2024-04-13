import { Link, type LinkProps, useRouterState } from "@tanstack/react-router";

export type NavLinkProps = LinkProps;

export function NavLink(props: NavLinkProps): JSX.Element {
	const { location } = useRouterState();
	const { pathname } = location;

	return (
		<Link
			data-current={pathname === props.to}
			className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
			{...props}
		/>
	);
}
