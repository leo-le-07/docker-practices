import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { withStyles, WithStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1
  },
});

interface IProps extends WithStyles<typeof styles> {}

const NavBar = ({ classes }: IProps) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            xiusin
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(NavBar)

