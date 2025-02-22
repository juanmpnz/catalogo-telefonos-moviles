import { AppProvider } from '@/context/PhoneProvider';
import '@/styles/globals.scss';
import Header from '@/components/Header';
import { getPhones } from '@/services/api';
import './layout.scss';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const initialPhones = await getPhones();

  return (
    <html lang='es'>
      <body className='layout'>
        <AppProvider initialPhones={initialPhones}>
          <Header />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
