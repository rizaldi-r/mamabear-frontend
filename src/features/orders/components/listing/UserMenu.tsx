'use client';

import { usePathname, useRouter } from "next/navigation";
import {
    UserCircle,
    ShoppingBag,
    Home,
    Lock,
    Heart,
    Info,
    HelpCircle,
    Phone,
    LogOut,
    LucideIcon,
} from "lucide-react";

type MenuItem = {
    label: string;
    href: string;
    icon: LucideIcon;
};

type MenuSection = {
    title: string;
    items: MenuItem[];
};

const menuSections: MenuSection[] = [
    {
        title: "Akun Saya",
        items: [
        { label: "Profil & Alamat", href: "/akun/profil", icon: UserCircle },
        { label: "Pesanan Saya",    href: "/akun/pesanan", icon: ShoppingBag },
        { label: "Daftar Alamat",   href: "/akun/alamat",  icon: Home },
        { label: "Ubah Password",   href: "/akun/password", icon: Lock },
        { label: "Favorit Saya",    href: "/akun/favorit", icon: Heart },
        ],
    },
    {
        title: "Preferensi",
        items: [
        { label: "Tentang Kami",  href: "/tentang-kami",  icon: Info },
        { label: "Bantuan",       href: "/bantuan",        icon: HelpCircle },
        { label: "Hubungi Kami",  href: "/hubungi-kami",  icon: Phone },
        ],
    },
];

function MenuItemButton({
    item,
    isActive,
    onClick,
}: {
    item: MenuItem;
    isActive: boolean;
    onClick: () => void;
}) {
    const Icon = item.icon;

    return (
        <button
        onClick={onClick}
        className={`
            flex w-full items-center gap-3 rounded-full border px-4 py-3
            text-sm font-semibold transition-colors duration-150
            ${
            isActive
                ? "border-[var(--mama-hot-pink)] bg-pink-50 text-pink-700"
                : "border-[var(--mama-hot-pink)] bg-white text-gray-700 hover:bg-gray-50"
            }
        `}
        >
        <Icon
            size={18}
            className={isActive ? "text-[var(--mama-brown)]" : "text-[#A05050]"}
            aria-hidden="true"
        />
        {item.label}
        </button>
    );
}

type UserMenuProps = {
    onNavigate?: (href: string) => void;
    onLogout?: () => void;
    className?: string;
};

export default function UserMenu({
    onNavigate,
    onLogout,
    className = "",
}: UserMenuProps) {
    const router = useRouter();
    const pathname = usePathname();

    function handleNavigate(href: string) {
        if (onNavigate) {
        onNavigate(href);
        } else {
        router.push(href);
        }
    }

    function handleLogout() {
        if (onLogout) {
        onLogout();
        } else {
        router.push("/login");
        }
    }

    return (
        <nav
        aria-label="Menu akun pengguna"
        className={`w-full max-w-[280px] rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ${className}`}
        >
        {menuSections.map((section) => (
            <div key={section.title} className="mb-6 last:mb-4">
            {/* section title */}
            <p className="mb-3 ml-1 text-sm font-semibold text-[var(--mama-brown)]">
                {section.title}
            </p>

            {/* menu items */}
            <div className="flex flex-col gap-2">
                {section.items.map((item) => (
                <MenuItemButton
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                    onClick={() => handleNavigate(item.href)}
                />
                ))}
            </div>
            </div>
        ))}
        <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D94F7A] py-3 text-sm font-semibold 
            text-white transition-colors duration-150 hover:bg-[#C03D68] active:scale-[0.98]"
        >
            <LogOut size={16} aria-hidden="true" />
            Log Out
        </button>
        </nav>
    );
}