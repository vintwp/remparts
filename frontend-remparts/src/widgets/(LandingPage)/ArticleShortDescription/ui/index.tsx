import { Container } from '@/shared/ui';
import { FeatureItem } from './FeatureItem';

const titleStyles = 'mb-4 text-2xl font-bold';

export function ArticleShortDescription() {
  return (
    <div className="bg-neutral-50">
      <Container>
        <div className="space-y-4 px-3 py-8 leading-[1.5] md:space-y-8 md:px-0 md:py-12 md:text-lg">
          <div>
            <h3 className={titleStyles}>Усе для ремонту техніки — в одному місці!</h3>
            <p>
              Ласкаво просимо до нашого інтернет-магазину! Ми пропонуємо{' '}
              <b>
                широкий вибір запчастин, аксесуарів та професійного обладнання для ремонту телефонів
              </b>
              , планшетів та ноутбуків. Чи ви майстер зі стажем, чи просто хочете відремонтувати
              свій гаджет самостійно — у нас є все необхідне.
            </p>
          </div>
          <div>
            <h4 className={titleStyles}>У нас ви знайдете:</h4>
            <div className="space-y-8">
              <FeatureItem
                img="/icons/spare-parts-icon.png"
                featureTitle="Оригінальні та сумісні запчастини"
                feature="для популярних моделей iPhone, Samsung, Xiaomi, Huawei
                та інших брендів"
              />
              <FeatureItem
                img="/icons/service-icon.png"
                featureTitle="Інструменти та обладнання"
                feature="для паяння, розбирання, діагностики та ремонту"
              />
              <FeatureItem
                img="/icons/accessories-icon.png"
                featureTitle="Аксесуари та комплектуючі"
                feature="— кабелі, зарядні пристрої, чохли, захисні скла та багато
                іншого"
              />
            </div>
          </div>
          <div>
            <h4 className={titleStyles}>Професійний ремонт техніки</h4>
            <p className="my-4">
              Не хочете розбиратись самі? Довірте ремонт нам! Наші майстри проведуть якісну
              діагностику та відновлення телефонів, планшетів і ноутбуків будь-якої складності.
            </p>
            <div className="space-y-8">
              <FeatureItem
                img="/icons/feature-icon.png"
                featureTitle="Швидко та надійно"
                size={24}
              />
              <FeatureItem
                img="/icons/feature-icon.png"
                featureTitle="Гарантія на всі види робіт"
                size={24}
              />
              <FeatureItem
                img="/icons/feature-icon.png"
                featureTitle="Використовуємо лише перевірені комплектуючі"
                size={24}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
