import React, { useState, useContext, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone'
import SendIcon from '@material-ui/icons/Send'
import CircularProgress from '@material-ui/core/CircularProgress'

import { NotificationContext } from '../../components/notification/provider'
import { showSuccess } from '../../components/notification/action'
import useStyles from './style'

const CREATE_POST = gql`
mutation CreatePost($userId: ID!, $content: String!, $file: Upload!) {
  createPost(userId: $userId, content: $content, file: $file) {
    id
    content
    photos {
      id
      url
    }
  }
}
`

const StatusEditor = () => {
  const classes = useStyles({})
  const { dispatch } = useContext(NotificationContext)

  const [createPost, { data, loading: createPostLoading, error }] = useMutation(CREATE_POST)

  const [content, setContent] = useState('')
  const [image, setImage] = useState<File>()
  const [submitAvailable, setSubmitAvailable] = useState(false)
  useEffect(() => {
    if (createPostLoading || content === '') return setSubmitAvailable(false)
    setSubmitAvailable(true)
  }, [content, createPostLoading])


  const handleSubmit = () => {
    const variables = {
      content,
      userId: 1, // Hard code
      file: image,
    }
    console.log({ variables })
    createPost({ variables })
  }

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
        onChange={(e) => setContent(e.target.value)}
      />
      <div className={classes.actions}>
        <div>
          <input
            // accept="image/*"
            id="image"
            type="file"
            className={classes.inputFile}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="image">
            <Button
              style={{ color: image && 'green' }}
              component="span"
              size="small"
              className={classes.imageButton}
            >
              <AddAPhotoIcon />
            </Button>
          </label>
        </div>
        { createPostLoading ? (
          <CircularProgress className={classes.progress} />
          ) : (
            <IconButton
              onClick={handleSubmit}
              disabled={!submitAvailable}
              color="primary"
              className={classes.submitButton}
              aria-label="submit"
            >
              <SendIcon />
            </IconButton>
          )
        }
      </div>
    </Paper>
  )
}

export default StatusEditor
