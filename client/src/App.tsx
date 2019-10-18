import React from 'react';
import { makeStyles, createStyles, Theme, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import orange from "@material-ui/core/colors/orange";
import teal from "@material-ui/core/colors/teal";
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

import NavBar from './components/nav-bar'
import StatusEditor from './components/status-editor'
import Feeds from './components/feeds'

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar,
  }),
);

const App = () => {
  const classes = useStyles({})

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="sm" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StatusEditor />
              </Grid>
              <Grid item xs={12}>
                <Feeds />
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
