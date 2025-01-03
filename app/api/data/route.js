import { NextResponse } from "next/server";

// Enable static export
export const dynamic = 'force-static';

export async function GET(request) {
  return NextResponse.json({
    success: true,
    message: 'hello!',
    data: {
      message: 'Message and email sent successfully!',
    }
  }, { status: 200 });
};