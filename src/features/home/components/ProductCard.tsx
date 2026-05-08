import {
    Card,
    CardContent
} from "@/components/ui/card";
import { getHomeData } from "../services/homeService";

interface ProductCardProps {
    productId: number;
}

export async function ProductCard({ productId }: ProductCardProps) {
    const data = await getHomeData();
    const product = data.products.find((p: any) => p.id === productId);

    if (!product) {
        return null;
    }

    return (
        <Card className="rounded-3xl shadow-lg border border-pink-100 bg-card overflow-hidden">
            <CardContent className="p-6 md:p-10 flex flex-col items-center gap-6 text-center">
                <div className="w-full aspect-square bg-secondary rounded-2xl flex items-center justify-center shrink-0">
                    <span className="text-pink-200">{product.image}</span>
                </div>
                <h4 className="font-bold text-stone-800 text-lg">{product.name}</h4>
                <p className="text-stone-600 italic leading-relaxed">{product.description}</p>
            </CardContent>
        </Card>
    );
}