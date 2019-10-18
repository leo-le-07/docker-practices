import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Feed from '../../components/feed'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    feed: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const Feeds = () => {
  const classes = useStyles({})

  return (
    <>
      <div className={classes.feed}>
        <Feed />
      </div>
      <div className={classes.feed}>
        <Feed />
      </div>
      <div className={classes.feed}>
        <Feed />
      </div>
    </>
  )
}

export default Feeds
