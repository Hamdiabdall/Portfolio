import { NextResponse } from "next/server";

// Set the correct runtime
export const runtime = 'edge';

export async function GET(request) {
  return NextResponse.json({
    success: true,
    message: 'API is working!',
    data: {
      message: 'Portfolio API is up and running.',
    }
  }, { status: 200 });
};