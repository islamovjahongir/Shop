import { baseApiReq } from '../core/baseApiRequest';
import { ICards } from './Cards/lib/ICardTypes';

export const getData = async (): Promise<ICards[]> => {
  try {
    const response = await baseApiReq.get('/');
    return response.data; 
  } catch (error: any) {
    throw new Error(error.message || 'Server error');
  }
};