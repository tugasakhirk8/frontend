import React, {useEffect} from 'react';
import Layout from './layout';
import Absentlist from '../components/absentlist';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import FormAddAbsent from '../components/formaddabsen';

const Absent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
        <FormAddAbsent />
    </Layout>
  );
};

export default Absent