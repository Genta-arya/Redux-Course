// useAuthCheck.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated, setVoucherData, selectVoucherData } from '../View/User/Component/productlist/fitur/AuthSlice';
import { API_ENDPOINTS } from './API';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const voucherData = useSelector(selectVoucherData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const uid = localStorage.getItem('uid');

        const response = await fetch(API_ENDPOINTS.CekJWT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {

          dispatch(setAuthenticated(false));
          // navigate('/shop');
        } else {
          dispatch(setAuthenticated(true));

        
          const voucherResponse = await fetch(API_ENDPOINTS.Voucher, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_uid: uid, is_used: 0 }),
          });

          if (voucherResponse.ok) {
            const fetchedVoucherData = await voucherResponse.json();
            console.log(fetchedVoucherData);
            dispatch(setVoucherData(fetchedVoucherData));
          }
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  return voucherData;
};

export default useAuthCheck;
