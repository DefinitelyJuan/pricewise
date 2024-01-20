import { useState } from "react";
import axios from 'axios';

export const useFetch = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (endpoint, params, methodType, body, headers) => {
        setIsLoading(true);
        try {
            let options;
            if (methodType === 'GET') {
                options = {
                    method: 'GET',
                    url: `https://pricewiseapi.azurewebsites.net/api/${endpoint}`,
                    params: { ...params },
                };
            } else {
                options = {
                    method: 'POST',
                    url: `https://pricewiseapi.azurewebsites.net/api/${endpoint}`,
                    headers: { ...headers },
                    data: { ...body }
                };
            }
            const response = await axios.request(options);
            setData(response);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, fetchData };
}
