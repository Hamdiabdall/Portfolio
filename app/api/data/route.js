import { NextResponse } from "next/server";

// Remove runtime edge for static export compatibility
// export const runtime = 'edge';
// Add force-static for static export compatibility
export const dynamic = 'force-static';

export async function GET(request) {
  return NextResponse.json({
    success: true,
    message: 'API is working!',
    data: {
      message: 'Portfolio API is up and running.',
    }
  }, { status: 200 });
};