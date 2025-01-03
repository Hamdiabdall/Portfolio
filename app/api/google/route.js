import axios from "axios";
import { NextResponse } from "next/server";

// Set the correct runtime
export const runtime = 'edge';

// Enable static export
export const dynamic = 'force-static';
export const revalidate = 0;

export async function POST(request) {
  const reqBody = await request.json();
  const secret_key = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  if (!secret_key) {
    console.error('reCAPTCHA secret key is missing');
    return NextResponse.json({
      error: "Contact form is currently disabled",
      success: false,
    }, { status: 503 });
  }

  try {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${reqBody.token}`;

    const res = await axios.post(url);
    if (res.data.success) {
      return NextResponse.json({
        message: "Captcha verification success",
        success: true,
      });
    }

    console.error('reCAPTCHA verification failed:', res.data['error-codes']);
    return NextResponse.json({
      error: "Captcha verification failed",
      success: false,
    }, { status: 400 });
  } catch (error) {
    console.error('reCAPTCHA API error:', error.message);
    return NextResponse.json({
      error: "Captcha verification failed",
      success: false,
    }, { status: 500 });
  }
}