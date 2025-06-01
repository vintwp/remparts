import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { FRONTEND_DOMAIN } from '@/shared/config';
import { Button } from '@/shared/ui';

type Props = {
  disabled?: boolean;
};

export function GoogleForm({ disabled = false }: Props) {
  const router = useRouter();

  const handleGoogle = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const popup = window.open(
      'http://localhost:5000/api/auth/google',
      'Google Auth Callback',
      'width=500,height=500',
    );

    if (!popup) {
      return;
    }

    const handlePopupMessage = (event: MessageEvent) => {
      if (event.origin !== FRONTEND_DOMAIN) {
        return;
      }

      try {
        const message = JSON.parse(event.data);

        if (message.error) {
          toast.error(message.error);
          return;
        }

        if (message.success) {
          toast.success(message.success);
          router.push('/');
          return;
        }
      } catch {
        toast.info('Неочікувана помилка, перезавантажте сторінку');
      }
    };

    window.addEventListener('message', handlePopupMessage, { once: true });
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="mt-4 w-full hover:bg-transparent hover:text-black/80"
      onClick={handleGoogle}
      disabled={disabled}
    >
      <Image
        src="/icons/google.png"
        alt="Google"
        width={18}
        height={18}
      />
      <span>Продовжити через Google</span>
    </Button>
  );
}
