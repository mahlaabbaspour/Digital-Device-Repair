'use client'

import { useEffect, useRef, useState } from 'react'
import { Avatar, Box, Card, CardHeader, IconButton, styled, TextField, Tooltip, Typography } from '@mui/material'
import { Send, Reply, Close } from '@mui/icons-material'
import Image from 'next/image'
import { FaRegEdit } from 'react-icons/fa'
import { BiCommand, BiDotsVertical, BiPhone, BiSearch, BiTrash } from 'react-icons/bi'
import { useCreateCommentUser, useFetchComment } from '@/hooks/user/useUserDocument'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import {
  useCreateCommentConsultant,
  useDeleteCommentConsultant,
  useFetchCommentConsultant,
  useUpdateCommentConsultant
} from '@/hooks/consultant/useConsultantDocument'

// import { useFetchComment } from '@/hooks/user/useUserDocument'

// Custom styled scrollbar container
const ScrollableBox = styled(Box)(({ theme }) => ({
  overflowY: 'auto',
  overflowX: 'hidden',
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[100]}`,
  '&::-webkit-scrollbar': {
    width: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.grey[100],
    borderRadius: '10px'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: theme.palette.grey[500]
    }
  }
}))

export default function CommentConsultant({ documentId, id, advisorId }: any) {
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollableBoxRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState<any>([])
  const [newMessage, setNewMessage] = useState('')
  const [replyingTo, setReplyingTo] = useState<any | null>(null)
  const [editingMessage, setEditingMessage] = useState<any | null>(null)
  const [selectMessgeId, setSelectMessageId] = useState(null)
  const session: any = useSession()
  const sessionUserId = session?.data?.user?.user?.id

  const { data, isLoading }: any = useFetchCommentConsultant({
    id: id,
    rowId: documentId
  })

  useEffect(() => {
    if (data) {
      const dataFormat = data?.map((message: any) => ({
        ...message,
        sender: message?.user?.id === sessionUserId ? 'userOnline' : 'user'
      }))

      setMessage(dataFormat ?? [])
    }
  }, [data])

  const { mutateAsync, isPending }: any = useCreateCommentConsultant()
  const { mutateAsync: update, isPending: loadingUpdate }: any = useUpdateCommentConsultant()
  const { mutateAsync: deleteComment, isPending: loadingDelete }: any = useDeleteCommentConsultant()

  const handleSendMessage = async () => {
    try {
      const data = {
        body: newMessage,
        parent_id: null
      }

      const res: any = await toast.promise(mutateAsync({ data: data, id: id, rowId: documentId }), {
        pending: 'در حال ارسال..'
      })
      if (res?.status) {
        setNewMessage('')
      }
    } catch (error) {
      throw error
    }
  }

  const handleUpdateMessage = async () => {
    try {
      const data = {
        body: newMessage,
        parent_id: null
      }
      const res: any = await toast.promise(
        update({ data: data, id: id, rowId: documentId, commentId: selectMessgeId }),
        {
          pending: 'در حال ارسال..'
        }
      )
      if (res?.status) {
        setNewMessage('')
      }
    } catch (error) {
      throw error
    }
  }

  const handleDestroyMessage = async (messageId: any) => {
    try {
      const res: any = await toast.promise(deleteComment({ id: id, rowId: documentId, commentId: messageId }), {
        pending: 'در حال حذف ...'
      })
      if (res?.status) {
        setNewMessage('')
      }
    } catch (error) {
      throw error
    }
  }

  const editeClick = (message: any) => {
    setNewMessage(message?.body)
    setEditingMessage(message)
    setSelectMessageId(message?.id)
  }

  const getParentMessage = (message: any) => {
    if (message?.parantId) return null

    // return message.find((m: any) => m?.id === message?.parantId)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 700,
          maxHeight: '50vh',
          width: '100%',
          maxWidth: '120vh',
          overflow: 'hidden'
        }}
      >
        <CardHeader
          sx={{ px: 2, py: 1, height: 100 }}
          title={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar alt='User' src='/images/avatars/1.png' sx={{ width: '70px', height: '70px' }} />

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='subtitle1' fontWeight={600}>
                    امیر محمدی
                  </Typography>

                  <Typography variant='caption' color='text.secondary'>
                    اخرین بازید اخیرا
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton>
                  <BiSearch />
                </IconButton>
                <IconButton>
                  <BiPhone />
                </IconButton>
                <IconButton>
                  <BiCommand />
                </IconButton>
                <IconButton>
                  <BiDotsVertical />
                </IconButton>
              </Box>
            </Box>
          }
        />

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            backgroundColor: '#f5f5f5',
            overflow: 'hidden'
          }}
        >
          <ScrollableBox
            ref={scrollableBoxRef}
            sx={{
              flex: 1,
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 'calc(100% - 120px)'
            }}
          >
            {message?.map((message: any) => {
              const parantMessage = getParentMessage(message)

              return (
                <Box
                  key={message?.id}
                  sx={{
                    display: 'flex',
                    flexDirection: message?.sender === 'userOnline' ? 'row' : 'row-reverse',
                    alignItems: 'flex-end',
                    mt: 3,
                    mb: 2,
                    alignSelf: message?.sender === 'userOnline' ? 'flex-start' : 'flex-end'
                  }}
                >
                  {message?.sender === 'user' && (
                    <Tooltip title={message?.user?.fullName}>
                      <Avatar
                        sx={{
                          width: 25,
                          height: 25,
                          mb: 4,
                          ml: 2
                        }}
                      >
                        <Image src={'/images/avatars/1.png'} alt={'User'} width={25} height={25} />
                      </Avatar>
                    </Tooltip>
                  )}

                  <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 'calc(100% - 40px)' }}>
                    {/* {parantMessage && (
                      <Box
                        sx={{
                          backgroundColor: message?.sender === 'user' ? '#e6e6e6' : '#7cb7f7',
                          padding: '6px 8px',
                          borderRadius: '8px 8px 0 0',
                          borderBottom: '1px solid #e0e0e0',
                          maxWidth: '100%',
                          mb: -0.5,
                          textAlign: message?.sender === 'user' ? 'right' : 'left'
                        }}
                      >
                        <Typography
                          color={message?.sender === 'user' ? '#6b6b6b' : 'whitesmoke'}
                          variant='caption'
                          sx={{
                            fontSize: '0.675rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-flex',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {parantMessage?.text}
                        </Typography>
                      </Box>
                    )} */}

                    <Box
                      sx={{
                        position: 'relative',
                        backgroundColor: message?.sender === 'userOnline' ? '#1976d2' : 'gray',
                        padding: '8px 12px',
                        borderRadius: parantMessage ? '0 0 8px 8px' : '8px',
                        borderBottomRightRadius: message?.sender === 'userOnline' ? 0 : 8,
                        borderBottomLeftRadius: message?.sender === 'userOnline' ? 8 : 0,
                        maxWidth: '100%',
                        minWidth: '150px',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',
                        display: 'inline-block'
                      }}
                    >
                      {message?.sender === 'user' && (
                        <Tooltip title='پاسخ'>
                          <IconButton
                            size='small'
                            color='primary'
                            sx={{
                              position: 'absolute',
                              top: -21,
                              left: -12
                            }}
                          >
                            <Reply fontSize='small' color='primary' />
                          </IconButton>
                        </Tooltip>
                      )}
                      {message?.sender === 'userOnline' && (
                        <Box display='flex'>
                          <Tooltip title='ویرایش'>
                            <IconButton
                              onClick={() => editeClick(message)}
                              size='small'
                              sx={{
                                position: 'absolute',
                                top: -2,
                                right: -20
                              }}
                            >
                              <FaRegEdit size={12} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='حذف'>
                            <IconButton
                              onClick={() => handleDestroyMessage(message?.id)}
                              size='small'
                              sx={{
                                position: 'absolute',
                                top: 18,
                                right: -20
                              }}
                            >
                              <BiTrash size={15} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                      <Typography
                        color='white'
                        variant='body2'
                        sx={{
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word'
                        }}
                      >
                        {message?.body}
                      </Typography>
                      {/* <Typography
                        variant='caption'
                        sx={{
                          display: 'block',
                          textAlign: message?.sender === 'user' ? 'left' : 'right',
                          color: 'text.secondary',
                          mt: 1
                        }}
                      >
                        {formatTime(message?.timestamp)}
                      </Typography> */}
                    </Box>
                  </Box>
                </Box>
              )
            })}
            <div ref={messagesEndRef} />
          </ScrollableBox>

          {(replyingTo || editingMessage) && (
            <Box
              sx={{
                borderTop: '1px solid #e0e0e0',
                padding: 1,
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <Reply fontSize='small' color='action' sx={{ ml: 1, transform: 'scaleX(-1)' }} />
                <Box sx={{ overflow: 'hidden' }}>
                  <Typography variant='caption' mb={1} fontSize={10} sx={{ display: 'block', color: 'text.secondary' }}>
                    {editingMessage
                      ? 'در حال ویرایش پیام '
                      : `در پاسخ به ${replyingTo?.sender === 'admin' ? 'شما ' : 'کاربر'}`}
                  </Typography>
                  <Typography noWrap variant='body2'>
                    {editingMessage ? editingMessage.text : replyingTo?.text}
                  </Typography>
                </Box>
              </Box>
              <IconButton size='small'>
                <Close fontSize='small' />
              </IconButton>
            </Box>
          )}

          <Box
            sx={{
              borderTop: '1px solid #e0e0e0',
              padding: 1,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              fullWidth
              inputRef={inputRef}
              variant='outlined'
              size='small'
              color={replyingTo ? 'warning' : 'primary'}
              placeholder={
                editingMessage ? 'در حال ویرایش پیام...' : replyingTo ? 'در حال پاسخ ...' : 'پیام خود را بنویسید..'
              }
              value={newMessage}
              onChange={(e: any) => setNewMessage(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0.5,
                  paddingRight: 1
                }
              }}
            />
            <IconButton
              color={replyingTo ? 'warning' : 'primary'}
              onClick={editingMessage ? handleUpdateMessage : handleSendMessage}
              disabled={!newMessage.trim()}
              sx={{ ml: 1 }}
            >
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
