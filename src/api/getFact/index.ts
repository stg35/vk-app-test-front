import axios from 'axios';
import { apiRoutes } from '../apiRoutes';

export interface IGetFactResponse {
	fact: string;
	length: number;
}

export const getFact = async (): Promise<IGetFactResponse> => {
	const { data } = await axios.get<IGetFactResponse>(apiRoutes.fact());
	return data;
};
