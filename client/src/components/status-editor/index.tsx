import React, { useState, useContext } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone'
import SendIcon from '@material-ui/icons/Send'

import { NotificationContext } from '../../components/notification/provider'
import { showSuccess } from '../../components/notification/action'

const useStyles = makeStyles((theme: Theme) =>
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
    actions: {
      display: 'flex',
      alignContent: 'space-between',
    },
  }),
);

const StatusEditor = () => {
  const classes = useStyles({})
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File>()
  const { dispatch } = useContext(NotificationContext)

  const popupNotification = () => {
    dispatch(showSuccess('Thanh cong roi'))
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="What're you thinking?"
        multiline
        rows={3}
        value={content}
        onChange={(e) => setContent(e!.target.value)}
      />
      <div className={classes.actions}>
        <div>
          <input
            accept="image/*"
            id="image"
            type="file"
            className={classes.inputFile}
            onChange={e => setImage(e.target.files[0])}
          />
          <label htmlFor="image">
            <Button
              style={{ color: image && "green" }}
              component="span"
              size="small"
              className={classes.imageButton}
            >
              <AddAPhotoIcon />
            </Button>
          </label>
        </div>
        <IconButton
          onClick={popupNotification}
          color="primary"
          className={classes.submitButton}
          aria-label="submit"
        >
          <SendIcon />
        </IconButton>
      </div>
    </Paper>
  )
}

export default StatusEditor
