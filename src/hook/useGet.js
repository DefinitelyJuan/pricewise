import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { BASEROUTE } from '../constants';


const useGet = () => {
    const [data, setData] = useState();
    const [error, setError] =  useState();
    const [loading, setLoading] = useState(false);

    const getData = async (endpoint) => {
        setLoading(true);
        try {
            const response = await axios.get(BASEROUTE + endpoint);
            setData(response.data)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return {data, error, loading, getData}
}

export default useGet