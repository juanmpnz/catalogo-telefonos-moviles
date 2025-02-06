import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';
import { usePhone } from '@/context/PhonesContext';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock del router de Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock del contexto de teléfonos
jest.mock('@/context/PhonesContext', () => {
  const actualModule = jest.requireActual('@/context/PhonesContext');
  return {
    ...actualModule,
    usePhone: jest.fn(),
  };
});

describe('Home Component', () => {
  const mockSetSelectedPhoneId = jest.fn();
  const mockFetchAndSetAllPhonesData = jest.fn();
  const mockFetchAndSetPhoneByQueryData = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // 🔥 Limpiar mocks antes de cada test

    // Mock de useRouter
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    // Mock de usePhone
    (usePhone as jest.Mock).mockReturnValue({
      setSelectedPhoneId: mockSetSelectedPhoneId,
      fetchAndSetAllPhonesData: mockFetchAndSetAllPhonesData,
      fetchAndSetPhoneByQueryData: mockFetchAndSetPhoneByQueryData,
      storedPhones: [
        { id: '1', brand: 'Samsung', name: 'Galaxy S23', basePrice: 799 },
        { id: '2', brand: 'Apple', name: 'iPhone 14', basePrice: 999 },
      ],
    });
  });

  test('renderiza el componente correctamente', () => {
    render(<Home />);
    expect(screen.getByText(/Samsung/i)).toBeInTheDocument();
    expect(screen.getByText(/iPhone/i)).toBeInTheDocument();
  });

  test('ejecuta onClick correctamente al hacer clic en una tarjeta', () => {
    render(<Home />);
    const firstCard = screen.getByText(/Samsung/i);

    fireEvent.click(firstCard);

    expect(mockSetSelectedPhoneId).toHaveBeenCalledWith('1');
    expect(mockRouterPush).toHaveBeenCalled();
  });

  test('ejecuta la función de búsqueda correctamente', () => {
    render(<Home />);
    const searchInput = screen.getByRole('textbox');

    fireEvent.change(searchInput, { target: { value: 'iPhone' } });

    expect(mockFetchAndSetPhoneByQueryData).toHaveBeenCalledWith('iPhone');
  });

  test('llama a fetchAndSetAllPhonesData si no hay teléfonos en el contexto', () => {
    (usePhone as jest.Mock).mockReturnValue({
      setSelectedPhoneId: mockSetSelectedPhoneId,
      fetchAndSetAllPhonesData: mockFetchAndSetAllPhonesData,
      fetchAndSetPhoneByQueryData: mockFetchAndSetPhoneByQueryData,
      storedPhones: [],
    });

    render(<Home />);

    expect(mockFetchAndSetAllPhonesData).toHaveBeenCalled();
  });
});
