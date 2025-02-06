import { getPhones, getPhoneById, getPhoneByName } from '@/services/api';

export const usePhonesApi = () => {
  return { getPhoneById, getPhones, getPhoneByName };
};
