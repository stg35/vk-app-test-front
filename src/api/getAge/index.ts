import axios, { AxiosRequestConfig } from 'axios';
import { apiRoutes } from '../apiRoutes';

export interface IGetAgeResponse {
	name: string;
	age: number;
}

export const getAge = async (
	name: string,
	config?: AxiosRequestConfig,
): Promise<IGetAgeResponse> => {
	const { data } = await axios.get<IGetAgeResponse>(apiRoutes.age(name), config);
	return data;
};
