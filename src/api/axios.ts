// src/api/axios.ts
import axios from 'axios';

const spoonacularApi = axios.create({
  baseURL: 'https://api.spoonacular.com',
  params: {
    apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY as string,
  },
});

export default spoonacularApi;
