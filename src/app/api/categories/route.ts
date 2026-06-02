import { NextResponse } from "next/server";

/**
 * MOCK DATA: Hierarchical Categories
 */
export const MOCK_CATEGORIES = [
  {
    id: "cat_001",
    name: "ASI Booster",
    slug: "asi-booster",
    productCount: 12,
    image:
      "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg",
    description:
      "Natural herbal formulas specially designed to help increase Mama's breast milk quantity and quality.",
  },
  {
    id: "cat_002",
    name: "Almond Mix",
    slug: "almond-mix",
    productCount: 8,
    image:
      "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AlmonMix/AlmonMix-01.jpg",
    description:
      "Delicious and nutritious almond powder drinks, a great source of calcium and fiber for breastfeeding Mamas.",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_CATEGORIES,
    timestamp: new Date().toISOString(),
  });
}
