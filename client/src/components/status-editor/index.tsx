import React, { useState, useContext, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone'
import SendIcon from '@material-ui/icons/Send'
import CircularProgress from '@material-ui/core/CircularProgress'

import { NotificationContext } from '../../components/notification/provider'
import { showSuccess, showError } from '../../components/notification/action'
import useStyles from './style'

const CREATE_POST = gql`
  mutation CreatePost($userId: ID!, $content: String!, $url: String!) {
    createPost(userId: $userId, content: $content, url: $url) {
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

  const inputFileElement = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitAvailable, setSubmitAvailable] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [createPost, { loading: createPostLoading, error }] = useMutation(
    CREATE_POST,
    {
      onCompleted: () => {
        setContent('')
        setImageUrl('')
        if (inputFileElement !== null && inputFileElement.current !== null) {
          inputFileElement.current.value = ''
        }

        if (!error) {
          dispatch(showSuccess('Post created'))
        } else {
          dispatch(showError('Post failed: ' + error))
        }
      },
    },
  )

  useEffect(() => {
    if (createPostLoading || content === '') return setSubmitAvailable(false)
    setSubmitAvailable(true)
  }, [content, createPostLoading])

  const handleSubmit = () => {
    const variables = {
      content,
      userId: 2, // Hard code
      url: imageUrl,
    }
    createPost({ variables })
  }

  const handleUpload = async (event: any) => {
    setUploading(true)
    const image = event.target.files[0]

    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'geopins')
    formData.append('cloud_name', 'dgu4zdjuf')

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dgu4zdjuf/image/upload',
      formData,
    )
    setImageUrl(response.data.url)
    setUploading(false)
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
        {uploading ? (
          <CircularProgress className={classes.progress} />
        ) : (
          <div>
            <input
              accept="image/*"
              id="image"
              type="file"
              className={classes.inputFile}
              onChange={handleUpload}
            />
            <label htmlFor="image">
              <Button
                style={{ color: imageUrl && 'green' }}
                component="span"
                size="small"
                className={classes.imageButton}
              >
                <AddAPhotoIcon />
              </Button>
            </label>
          </div>
        )}
        {createPostLoading ? (
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
        )}
      </div>
    </Paper>
  )
}

export default StatusEditor
