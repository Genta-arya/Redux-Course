// AuthHook.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../View/User/Component/productlist/fitur/AuthSlice';
import { API_ENDPOINTS } from './API';


const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_ENDPOINTS.CekJWT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          console.log('auth not valid');
          dispatch(setAuthenticated(false));
          navigate('/shop');
        } else {
          dispatch(setAuthenticated(true));
         
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);
};

export default useAuthCheck;
