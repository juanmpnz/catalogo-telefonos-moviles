import type { Metadata } from 'next';
import { PhoneProvider } from '@/context/PhonesContext';
import '@/styles/globals.scss';
import Header from '@/components/Header';
import { getPhones } from '@/services/api';

export const metadata: Metadata = {
  title: 'Catálogo teléfonos móviles',
  description: 'Desafío de código',
  icons: {
    icon: '/favicon.ico', 
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
