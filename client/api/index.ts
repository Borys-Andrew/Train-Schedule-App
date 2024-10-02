import { Train } from '@/types/Train';
import { User } from '@/types/User';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.baseURL = BASE_URL;

export const getAllTrains = async () => {
  const token = JSON.parse(localStorage.getItem('authUser') as string).token;
  try {
    const response = await axios.get('trains', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log('🚀 ~ getAllTrains ~ error:', error);
  }
};

export const getTraineById = async (id: string) => {
  const token = JSON.parse(localStorage.getItem('authUser') as string).token;

  try {
    const response = await axios.get(`trains/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log('🚀 ~ getTraineById ~ error:', error);
  }
};

export const createTrain = async (train: Train) => {
  const token = JSON.parse(localStorage.getItem('authUser') as string).token;

  try {
    const response = await axios.post(`trains`, train, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log('🚀 ~ createTrain ~ error:', error);
  }
};

export const removeTrainById = async (id: string) => {
  const token = JSON.parse(localStorage.getItem('authUser') as string).token;

  try {
    const response = await axios.delete(`trains/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log('🚀 ~ removeTrainById ~ error:', error);
  }
};

export const editTrainById = async (id: string, train: Train) => {
  const token = JSON.parse(localStorage.getItem('authUser') as string).token;

  try {
    const response = await axios.put(`trains/${id}`, train, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log('🚀 ~ editTrainById ~ error:', error);
  }
};

export const login = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post('auth/login', userData);

    return response.data;
  } catch (error) {
    console.log('🚀 ~ login ~ error:', error);
  }
};

export const signup = async (userData: User) => {
  try {
    const response = await axios.post(`auth/register`, userData);

    return response.data;
  } catch (error) {
    console.log('🚀 ~ error:', error);
  }
};

export const isAuthenticated = async () => {
  const token = JSON.parse(localStorage.getItem('authUser') as string).token;

  try {
    const response = await axios.get(`auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log('🚀 ~ isAuthenticated ~ error:', error);
  }
};
