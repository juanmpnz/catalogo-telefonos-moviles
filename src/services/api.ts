import { Phone } from '@/interfaces';

const API_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com/products';
const API_KEY = '87909682e6cd74208f41a6ef39fe4191';

export const getPhones = async (): Promise<Phone[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching phones:', error);
    return [];
  }
};

export const getPhoneById = async (id: string): Promise<Phone | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      console.error(`Error ${response.status}: ${response.statusText}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching phone by ID:', error);
    return null;
  }
};

export const getPhoneByName = async (param: string): Promise<Phone[] | null> => {
  try {
    const response = await fetch(`${API_URL}?search=${param}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      console.error(`Error ${response.status}: ${response.statusText}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching phone by ID:', error);
    return null;
  }
};
