import {MOCK_CATEGORIES} from '@/app/api/categories/route';
import { NextResponse } from 'next/server';

/**
 * GET /api/categories/:id
 * Fetches a single category by its unique ID.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const category = MOCK_CATEGORIES.find((cat) => cat.id === id);

  if (!category) {
    return NextResponse.json(
      { success: false, message: "Category ID not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: category,
    timestamp: new Date().toISOString()
  });
}