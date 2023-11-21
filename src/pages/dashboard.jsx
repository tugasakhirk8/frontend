import React, {useEffect} from 'react';
import Layout from './layout';
import Welcome from '../components/welcome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/AuthSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));
  
    useEffect(() => {
        document.title = 'Dashboard'
    }, []);

    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);

    useEffect(() =>{
      if(isError){
        navigate("/");
      }
    }, [isError, navigate]);
    
    
  return (
    <Layout>
        <Welcome/>
    </Layout>
  );
};

export default Dashboard