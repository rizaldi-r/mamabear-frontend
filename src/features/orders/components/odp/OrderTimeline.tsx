import { CheckCircle2 } from "lucide-react"

interface TimelineStep {
    status: string;
    time: string;
    done: boolean;
    active?: boolean;
}

export default function OrderTimeline({ timeline }: { timeline: TimelineStep[] }) {
    if (!timeline) return null;

    return (
        <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-[#8B5E3C] mb-6 uppercase">Timeline</h3>
            <div className="space-y-8 relative">
                <div className="absolute left-3 top-2 bottom-8 w-px bg-stone-100" />
                {timeline.map((step, idx) => (
                    <div key={idx} className="flex gap-4 relative z-10">
                        <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center ${
                            step.done ? 'bg-pink-500 text-white shadow-lg shadow-pink-100' : 'bg-stone-100 text-stone-400'
                        }`}>
                            {step.done ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 bg-stone-300 rounded-full" />}
                        </div>
                    <div className="space-y-0.5">
                        <p className={`text-sm font-bold ${step.active ? 'text-pink-600' : 'text-stone-700'}`}>{step.status}</p>
                        <p className="text-[10px] text-stone-400 font-bold">{step.time}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}
