type OrderStatus = 'BELUM_DIBAYAR' | 'DIKONFIRMASI' | 'DIPROSES' | 'DIKIRIM' | 'SELESAI' | 'DIBATALKAN';

interface StatusBadgeProps {
    status: string;
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
    BELUM_DIBAYAR: {
        label: 'Belum dibayar',
        className: 'bg-amber-50 text-amber-700 border border-amber-200',
    },
    DIKONFIRMASI: {
        label: 'Dikonfirmasi',
        className: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
    },
    DIPROSES: {
        label: 'Diproses',
        className: 'bg-blue-50 text-blue-700 border border-blue-200',
    },
    DIKIRIM: {
        label: 'Dikirim',
        className: 'bg-pink-50 text-pink-700 border border-pink-200',
    },
    SELESAI: {
        label: 'Selesai',
        className: 'bg-green-50 text-green-700 border border-green-200',
    },
    DIBATALKAN: {
        label: 'Dibatalkan',
        className: 'bg-red-50 text-red-700 border border-red-200',
    },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status as OrderStatus];

    if (!config) {
        return (
            <span className="px-2.5 py-1 text-[10px] font-bold text-stone-500 hover:bg-[var(--mama-hot-pink)]">
                {status}
            </span>
        );
    }

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${config.className}`}>
            {config.label}
        </span>
    );
}