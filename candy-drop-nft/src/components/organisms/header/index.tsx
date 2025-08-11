import clsx from 'clsx';
import { Coins, Wallet } from 'lucide-react';

import Logo from '~/components/molecules/logo';
import { Button, buttonVariants } from '~/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '~/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { cn } from '~/lib/utils';

import { NavItem } from './interfaces';
import RightPortionWrapper from './right-portion-wrapper';
import UserMenu from './user-menu';

const navigationLinks: NavItem[] = [];

const Header = () => (
    <header className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2 w-full">
            {/* Mobile menu trigger */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                        <svg
                            className="pointer-events-none"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 12L20 12"
                                className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                            />
                            <path
                                d="M4 12H20"
                                className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                            />
                            <path
                                d="M4 12H20"
                                className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                            />
                        </svg>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-1 md:hidden">
                    <NavigationMenu className="max-w-none *:w-full">
                        <NavigationMenuList className="flex-col items-start gap-2">
                            {navigationLinks.map((link, index) => (
                                <NavigationMenuItem key={index} className="w-full">
                                    {link.submenu ? (
                                        <>
                                            <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                                                {link.label}
                                            </div>
                                            <ul>
                                                {link.items.map((item, itemIndex) => (
                                                    <li key={itemIndex}>
                                                        <NavigationMenuLink href={item.href} className="py-1.5">
                                                            {item.label}
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <NavigationMenuLink href={link.href} className="py-1.5">
                                            {link.label}
                                        </NavigationMenuLink>
                                    )}
                                    {/* Add separator between different types of items */}
                                    {index < navigationLinks.length - 1 &&
                                        // Show separator if:
                                        // 1. One is submenu and one is simple link OR
                                        // 2. Both are submenus but with different types
                                        ((!link.submenu && navigationLinks[index + 1].submenu) ||
                                            (link.submenu && !navigationLinks[index + 1].submenu) ||
                                            (link.submenu &&
                                                navigationLinks[index + 1].submenu &&
                                                link.type !== navigationLinks[index + 1].type)) && (
                                            <div
                                                role="separator"
                                                aria-orientation="horizontal"
                                                className="bg-border -mx-1 my-1 h-px w-full"
                                            />
                                        )}
                                </NavigationMenuItem>
                            ))}
                            <NavigationMenuItem
                                className={cn('w-full', clsx({ 'sr-only': !navigationLinks.length }))}
                                role="presentation"
                                aria-hidden="true"
                            >
                                <div
                                    role="separator"
                                    aria-orientation="horizontal"
                                    className="bg-border -mx-1 my-1 h-px"
                                ></div>
                            </NavigationMenuItem>
                            {/* <SignedIn> */}
                            {/*     {({ user }) => ( */}
                            {/*         <NavigationMenuItem className="w-full"> */}
                            {/*             <UserMenu user={user} /> */}
                            {/*         </NavigationMenuItem> */}
                            {/*     )} */}
                            {/* </SignedIn> */}
                            {/* <SignedOut> */}
                            {/*     <NavigationMenuItem className="w-full"> */}
                            {/*         <NavigationMenuLink asChild> */}
                            {/*             <SignInButton> */}
                            {/*                 <Wallet className="mr-1 size-4" /> */}
                            {/*                 Connect Wallet */}
                            {/*             </SignInButton> */}
                            {/*         </NavigationMenuLink> */}
                            {/*     </NavigationMenuItem> */}
                            {/* </SignedOut> */}
                        </NavigationMenuList>
                    </NavigationMenu>
                </PopoverContent>
            </Popover>
            {/* Main nav */}
            <div className="flex items-center gap-4 w-full">
                <Logo />
                {/* Navigation menu */}
                <NavigationMenu viewport={false} className="max-md:hidden">
                    <NavigationMenuList className="gap-2">
                        {navigationLinks.map((link, index) => (
                            <NavigationMenuItem key={index}>
                                {link.submenu ? (
                                    <>
                                        <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5">
                                            {link.label}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1">
                                            <ul className={cn(link.type === 'description' ? 'min-w-64' : 'min-w-48')}>
                                                {link.items.map((item, itemIndex) => (
                                                    <li key={itemIndex}>
                                                        <NavigationMenuLink href={item.href} className="py-1.5">
                                                            {/* Display icon if present */}
                                                            {link.type === 'icon' && 'icon' in item && (
                                                                <div className="flex items-center gap-2">
                                                                    {
                                                                        <item.icon
                                                                            size={16}
                                                                            className="text-foreground opacity-60"
                                                                            aria-hidden="true"
                                                                        />
                                                                    }
                                                                    <span>{item.label}</span>
                                                                </div>
                                                            )}

                                                            {/* Display label with description if present */}
                                                            {link.type === 'description' && 'description' in item ? (
                                                                <div className="space-y-1">
                                                                    <div className="font-medium">{item.label}</div>
                                                                    <p className="text-muted-foreground line-clamp-2 text-xs">
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                // Display simple label if not icon or description type
                                                                !link.type ||
                                                                (link.type !== 'icon' && link.type !== 'description' && (
                                                                    <span>{item.label}</span>
                                                                ))
                                                            )}
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </>
                                ) : (
                                    <NavigationMenuLink
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                                    >
                                        {link.label}
                                    </NavigationMenuLink>
                                )}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
        {/* Right side */}
        {/* <RightPortionWrapper> */}
        {/* <SignedIn> */}
        {/*     {({ user }) => ( */}
        {/*         <> */}
        {/*             <Link href="/campaigns/new" className={cn(buttonVariants())}> */}
        {/*                 <Coins className="mr-2 size-4" /> */}
        {/*                 New campaign */}
        {/*             </Link> */}
        {/*             <UserMenu user={user} /> */}
        {/*         </> */}
        {/*     )} */}
        {/* </SignedIn> */}
        {/* <SignedOut> */}
        {/*     <SignInButton variant="default"> */}
        {/*         <Wallet className="mr-1 size-4" /> */}
        {/*         Connect Wallet */}
        {/*     </SignInButton> */}
        {/* </SignedOut> */}
        {/* </RightPortionWrapper> */}
    </header>
);

export default Header;
