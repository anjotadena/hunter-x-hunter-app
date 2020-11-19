import React, { useState } from 'react';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';

import {BASE_URL} from '../config';

export function useAuth() {
  const [loggingIn, setLoggingIn] = useState(false);
  const [errors, setErrors] = useState(null);

  const doLogin = ({ email, password }) => {
    if (email === 'a@gmail.com' && password === 'password') {
        setErrors({
            message: 'Invalid credentials',
        });

        return;
    }

    loggingIn(true);

    setTimeout(() => {
        SecureStorage.setItem('user', JSON.stringify({ email, password }));

        loggingIn(false);
    }, 3500);
  };

  const doLogout = async () => {
    SecureStorage.removeItem('user');

    return { logout: true };
  };

  React.useEffect(() => {
    
    SecureStorage.getItem('user').then((v) => {
        // if (v) {
        // }
    });
  }, []);

  return {loggingIn, doLogin, doLogout, errors};
}