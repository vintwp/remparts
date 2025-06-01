'use client';

import { RefObject } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = {
  error?: string;
  onChange?: (token: string | null) => void;
  ref?: RefObject<ReCAPTCHA | null>;
};

export function ReCaptcha({ error, onChange, ref }: Props) {
  return (
    <div className="g-recaptcha">
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={onChange}
        ref={ref}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
