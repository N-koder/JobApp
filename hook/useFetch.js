import {useState , useEffect} from 'react';
import axios from 'axios';

// import {RAPID_API_KEY} from '@env';
// const rapidapikey = RAPID_API_KEY;

const useFetch = (endpoint , query) => {
	const [data , setData] = useState([]);
	const [IsLoading , setIsLoading] = useState(false);
	const [error , setError] = useState(null);

	const options = {
		  method: 'GET',
		  url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		  headers: {
		    'X-RapidAPI-Key': '528d0de4e6msh8835a8e4c880e52p1906fajsn2f90ae736ca2',
		    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
		  },
		  params: {...query},
		};

		const fetchData = async() => {
			setIsLoading(true);
			try {
				const response = await axios.request(options);
				setData(response.data.data);
				setIsLoading(false);
			} catch (error){
				setError(true);
				alert('There is an error!')
			} finally {
				setIsLoading(false);
			}
		}

		useEffect(() => {
			fetchData();
		} , []); 

		const refetch = () => {
			setIsLoading(true);
			fetchData();
		}

		return {data , error , IsLoading , refetch};
	}


export default useFetch;