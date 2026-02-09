// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import List, { ListProps } from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import axiosConfig from '@/libs/auth/axios'

const StyledList = styled(List)<ListProps>(({ theme }) => ({
  '& .MuiListItem-container': {
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '& .MuiListItem-root': {
      paddingRight: theme.spacing(24)
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    }
  }
}))

function FileList({ id, courseId }: any) {
  const [isDownloading, setIsDownloading] = useState(false)

  //   const downloadFile = async () => {
  //     try {
  //       setIsDownloading(true)
  //       const response = await axiosConfig.get(
  //         `/institution/${id}/education/course/core/course/${courseId}/course-student/upsert-data`,
  //         {
  //           responseType: 'blob'
  //         }
  //       )
  //       const blob = new Blob([response.data], { type: response.headers['Content-type'] })
  //       const link = document.createElement('a')
  //       link.href = window.URL.createObjectURL(blob)
  //       const fileName = response.headers['content-disposition']?.split('filename=')[1] || 'downloadedFile'
  //       link.download = fileName
  //       document.body.appendChild(link)
  //       link.click()
  //       document.body.removeChild(link)
  //     } catch (error) {
  //       throw error
  //     } finally {
  //       setIsDownloading(false)
  //     }
  //   }

  const downloadFile = async () => {
    try {
      const response = await axiosConfig.get(
        `/institution/${id}/education/course/core/course/${courseId}/course-student/upsert-data`,
        {
          responseType: 'blob'
        }
      )

      const blob = new Blob([response.data], {
        type: response.data.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url

      const contentDisposition = response.headers['content-disposition'] || ''
      let fileName = 'فراگیران.xlsx'
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/)
        if (match && match[1]) fileName = decodeURIComponent(match[1])
      }

      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('خطا در دانلود فایل:', err)
    }
  }

  return (
    <StyledList disablePadding>
      <ListItem key={1}>
        <div>
          <ListItemText primary='تکمیل اطلاعات فراگیران' />
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 0, color: 'success.main' } }}>
              <Icon icon='mdi:circle' fontSize='0.625rem' />
            </Box>
            <Typography>نمونه فایل تکمیل شده اطلاعات فراگیران</Typography>
          </Box>
        </div>
        <ListItemSecondaryAction>
          <Button
            disabled={isDownloading}
            onClick={downloadFile}
            variant='contained'
            size='small'
            sx={{ fontFamily: 'inherit' }}
          >
            دانلود
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </StyledList>
  )
}

export default FileList
