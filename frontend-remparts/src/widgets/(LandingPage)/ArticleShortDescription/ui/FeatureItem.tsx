import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

type Props = {
  img: string;
  featureTitle: string;
  feature?: string;
  size?: number;
  className?: string;
};

export function FeatureItem({ img, featureTitle, feature, size = 32, className }: Props) {
  return (
    <div className={cn('flex gap-2', className)}>
      <div className="">
        <Image
          src={img}
          width={32}
          height={32}
          alt={featureTitle}
          className={`w-[${size}px] h-[${size}px]`}
        />
      </div>
      <div className="basis-11/12">
        <span className="font-semibold">{featureTitle}</span> {feature && <span>{feature}</span>}
      </div>
    </div>
  );
}
