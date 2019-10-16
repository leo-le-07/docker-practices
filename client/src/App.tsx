import React from 'react';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import teal from "@material-ui/core/colors/teal";
import CssBaseline from '@material-ui/core/CssBaseline'

import NavBar from './components/nav-bar'

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700],
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700]
    }
  },
});

const App: React.FC = () => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
      </MuiThemeProvider>
    </>
  );
}

export default App;
