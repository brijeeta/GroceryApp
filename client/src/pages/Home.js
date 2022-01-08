import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
//change name
import { QUERY_NAME } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_NAME, {
        fetchPolicy: "no-cache"
    });

    return (
        <div className=''>

        </div>
    )
}