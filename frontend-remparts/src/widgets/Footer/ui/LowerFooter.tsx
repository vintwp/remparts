import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/ui';

export function LowerFooter() {
  return (
    <div className="bg-primary-alt/60 border-divider relative overflow-hidden border-t-[1px]">
      <Container>
        <div className="pt-7 pb-5 md:pt-14 md:pb-11">
          <p className="text-sm leading-none font-extralight text-white md:text-base">
            © 2025 Інтернет-магазин <span className="font-semibold">Remparts</span>
          </p>
        </div>
      </Container>
      <div className="absolute top-0 right-0">
        <div
          className={cn(
            'relative flex aspect-square w-full justify-end gap-15',
            'bottom-[180px] h-[500px] rotate-45',
          )}
        >
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className={cn('h-full border-l-[1px] border-white/20', idx === 2 && 'border-l-[3px]')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
