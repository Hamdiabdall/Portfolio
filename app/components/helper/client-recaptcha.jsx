'use client';

import ReCAPTCHA from 'react-google-recaptcha';

export default function ClientReCAPTCHA(props) {
  if (typeof window === 'undefined') return null;
  
  return <ReCAPTCHA {...props} />;
}
