import { Button } from "@/components/ui/button";

export function RoadToSale() {
  return (
    <section className="bg-[#fcf5f3] py-6 border-y border-pink-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center md:justify-between max-w-4xl gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">
            ROAD TO 5.5 SALE
          </h2>
          <Button
            variant="link"
            className="text-destructive font-bold p-0 h-auto hover:no-underline"
          >
            KLAIM VOUCHERNYA &gt;
          </Button>
        </div>
        <div className="flex gap-4">
          {[
            { label: "Hari", value: "01" },
            { label: "Jam", value: "11" },
            { label: "Menit", value: "30" },
            { label: "Detik", value: "15" },
          ].map((time, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-white w-12 h-12 flex items-center justify-center rounded-lg shadow-sm font-bold text-xl text-stone-800 border border-pink-50">
                {time.value}
              </div>
              <span className="text-xs text-stone-600 mt-1 font-medium">
                {time.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
