import React from 'react';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import { Stack } from '@mui/material';

const LoginAndRegisterButtons = () => {
  return (
    <div>
        <Stack
            spacing={4}
            align="center"
        >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5em' }}>
      <LoginButton />
      <RegisterButton />
    </div>
        </Stack> 
    </div>
  )
}

export default LoginAndRegisterButtons