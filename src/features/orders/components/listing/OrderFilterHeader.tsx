interface OrderFilterHeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    tabs: string[];
}

export default function OrderFilterHeader({ activeTab, setActiveTab, tabs }: OrderFilterHeaderProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                            activeTab === tab
                            ? 'bg-[#D65D7A] border-[#D65D7A] text-white shadow-md'
                            : 'bg-transparent border-none text-stone-500 hover:bg-[var(--mama-pink)] hover:text-[var(--mama-brown)]'
                        }`}
                    >
                    {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}   