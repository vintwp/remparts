import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Button,
  Link,
  Hr,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

type Props = {
  domain: string;
  token: string;
};

export function ConfirmationTemplate({ domain, token }: Props) {
  const confirmationLink = `${domain}/api/auth/confirmation/${token}`;

  const font = {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  };

  return (
    <Tailwind>
      <Html style={font}>
        <Head />
        <Body>
          <Preview>Remparts Email Verification</Preview>
          <Container className="bg-[#f7f7f7] rounded-[8px]">
            <Section>
              <Section className="p-2 px-4">
                <Img
                  src={`https://i.ibb.co/MmC1mQ9/logo.png`}
                  width="120"
                  height="40"
                  alt="Remparts Logo"
                />
              </Section>
              <Section className="px-4 text-base">
                <Section className="bg-white px-3">
                  <Heading className="text-3xl">Шановний(а) користувачу!</Heading>
                  <Text className="text-base">
                    Для завершення процесу реєстрації, просимо вас підтвердити свою електронну
                    пошту, перейшовши за наступним посиланням:
                  </Text>
                  <Section className="py-6">
                    <Button
                      className="box-border mx-auto text-lg rounded-[8px] bg-[#2b5e7a] px-4 py-3 text-center font-semibold text-white block max-w-max "
                      href={confirmationLink}
                    >
                      Підтвердити електронну пошту
                    </Button>

                    <Text className="text-small text-center mt-4 mb-0">
                      Посилання дійсне протягом 30 хвилин
                    </Text>
                  </Section>
                  <Text className="text-base">
                    Якщо ви не здійснювали реєстрацію на нашому сайті, будь ласка, проігноруйте цей
                    лист.
                  </Text>

                  <Text className="text-base mt-8">
                    Дякуємо за використання наших послуг. Якщо у вас виникли запитання, не соромтесь
                    звертатися до нашої служби підтримки:
                    <Text className="text-base">
                      <span className="font-medium">Email:</span>{' '}
                      <Link href="mailto:remparts.accessories@gmail.com">
                        remparts.accessories@gmail.com
                      </Link>
                    </Text>
                    <Text className="text-base">
                      <span className="font-medium">Телефон:</span>{' '}
                      <Link href="tel:+380732562665">+38 (073) 256 26 65</Link>
                    </Text>
                  </Text>
                </Section>
              </Section>
              <Hr />
              <Section className="px-6">
                <Text className="text-base">З повагою,</Text>
                <Text className="text-base font-semibold">Команда Remparts</Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
