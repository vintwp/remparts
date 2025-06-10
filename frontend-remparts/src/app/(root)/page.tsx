import { ArticleShortDescription, Features } from '@/widgets/(LandingPage)';
import { Banner } from '@/widgets/Banner';

import { Container } from '@/shared/ui';

export default async function Home() {
  return (
    <>
      <Container>
        <div className="-mx-3 md:mx-0">
          <Banner />
        </div>
      </Container>
      <Features />
      <ArticleShortDescription />
    </>
  );
}
