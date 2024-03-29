import axios from 'axios';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from 'utils/Path';
import { StatusCodes } from 'http-status-codes';

export const UnauthorizedHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                const statusCode: StatusCodes = error.response ? error.response.status : null;
                if (statusCode === StatusCodes.UNAUTHORIZED) {
                    navigate(Path.LANDING_PAGE, { state: { customMessage: 'You have been logged out.' } });
                } else {
                    return Promise.reject(error);
                }
            },
        );
    }, []);

    return null;
};
