'use client';

import ReCAPTCHA from 'react-google-recaptcha';

type Props = {
  error?: string;
  onChange?: (token: string | null) => void;
};

export function ReCaptcha({ error, onChange }: Props) {
  return (
    <div>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={onChange}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
