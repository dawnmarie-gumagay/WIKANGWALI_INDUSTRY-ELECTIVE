import React from 'react';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          color: '#0745a3', // Change this to your desired color
          '&$checked': {
            color: '#0745a3', // Change this to your desired color when the switch is checked
          },
          '&$disabled': {
            color: 'rgba(0, 0, 0, 0.38)', // Change this to your desired color when the switch is disabled
          },
        },
      },
    },
  },
});

function CustomizedSwitch() {
  return (
    <ThemeProvider theme={theme}>
      <Switch defaultChecked color="default" />
    </ThemeProvider>
  );
}

export default CustomizedSwitch;
