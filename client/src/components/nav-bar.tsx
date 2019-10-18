import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const NavBar = () => {
  return (
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          xiusin
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
