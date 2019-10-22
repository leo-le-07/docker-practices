import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      padding: theme.spacing(2),
    },
    inputFile: {
      display: 'none',
    },
    imageButton: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginLeft: 0,
    },
    submitButton: {
      marginBottom: theme.spacing(1),
    },
    progress: {
      margin: theme.spacing(1),
    },
    actions: {
      display: 'flex',
      alignContent: 'space-between',
    },
  }),
)
