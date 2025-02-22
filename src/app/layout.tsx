import type { Metadata } from 'next';
import { PhoneProvider } from '@/context/PhonesContext';
import '@/styles/globals.scss';
import Header from '@/components/Header';
import { getPhones } from '@/services/api';
import './layout.scss';
import componentText from '@/locales/locales.json'
import config from '@/config/config.json'

export const metadata: Metadata = {
  title: componentText.translations.metadata.title,
  description: componentText.translations.metadata.description,
  icons: {
    icon: config.configurations.metadata.favicon,
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const initialPhones = await getPhones();

  return (
    <html lang="es">
      <body className="layout">
        <PhoneProvider initialPhones={initialPhones}>
          <Header />
          <main>{children}</main>
        </PhoneProvider>
      </body>
    </html>
  );
}
