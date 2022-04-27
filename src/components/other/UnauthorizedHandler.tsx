import axios from 'axios';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../other/Paths';
import { StatusCodes } from 'http-status-codes';

export const UnauthorizedHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode: StatusCodes = error.response ? error.response.status : null;
        if (statusCode === StatusCodes.UNAUTHORIZED) {
          navigate(Paths.LOGIN, { state: { customMessage: 'You have been logged out.' } });
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
