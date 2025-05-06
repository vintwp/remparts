import { Container } from '@/shared/ui';
import { ArticleShortDescription, Features } from '@/widgets/(LandingPage)';
import { Banner } from '@/widgets/Banner';

export default async function Home() {
  return (
    <div>
      <Container>
        <div className="-mx-3 md:mx-0">
          <Banner />
        </div>
      </Container>
      <Features />
      <ArticleShortDescription />
    </div>
  );
}
