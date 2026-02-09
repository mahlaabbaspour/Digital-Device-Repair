// 'use client'

// import { useState } from 'react'
// import { Box, Button, IconButton, Typography } from '@mui/material'
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
// import DeleteIcon from '@mui/icons-material/Delete'

// type FileItem = {
//   file: File // ← خود فایل واقعی برای آپلود
//   preview: string // ← فقط برای نمایش
//   type: 'video' | 'audio' | 'image' | 'pdf' | 'other'
// }
// type Props = {
//   files: FileItem[]
//   setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
//   dataFiles: any[]
// }

// export default function MultiFileViewer({ files, setFiles, dataFiles }: Props) {
//   console.log(dataFiles, 'DATA FILEEEEEEEEE')
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [currentAudioIndex, setCurrentAudioIndex] = useState(0)

//   const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return

//     const newFiles: FileItem[] = Array.from(e.target.files).map(file => {
//       let type: FileItem['type'] = 'other'

//       if (file.type.startsWith('video')) type = 'video'
//       else if (file.type.startsWith('audio')) type = 'audio'
//       else if (file.type.startsWith('image')) type = 'image'
//       else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) type = 'pdf'

//       return {
//         file,
//         preview: URL.createObjectURL(file), // فقط برای نمایش
//         type
//       }
//     })

//     setFiles(prev => [...prev, ...newFiles])
//   }

//   const removeFile = (item: FileItem) => {
//     URL.revokeObjectURL(item.preview)

//     setFiles(prev => {
//       const updated = prev.filter(f => f !== item)

//       if (currentVideoIndex >= updated.filter(f => f.type === 'video').length) {
//         setCurrentVideoIndex(0)
//       }
//       if (currentImageIndex >= updated.filter(f => f.type === 'image').length) {
//         setCurrentImageIndex(0)
//       }
//       if (currentAudioIndex >= updated.filter(f => f.type === 'audio').length) {
//         setCurrentAudioIndex(0)
//       }

//       return updated
//     })
//   }

//   const videos = files.filter(f => f.type === 'video')
//   const images = files.filter(f => f.type === 'image')
//   const audios = files.filter(f => f.type === 'audio')

//   const prevVideo = () => setCurrentVideoIndex(i => (i === 0 ? videos.length - 1 : i - 1))
//   const nextVideo = () => setCurrentVideoIndex(i => (i === videos.length - 1 ? 0 : i + 1))

//   const prevImage = () => setCurrentImageIndex(i => (i === 0 ? images.length - 1 : i - 1))
//   const nextImage = () => setCurrentImageIndex(i => (i === images.length - 1 ? 0 : i + 1))

//   const prevAudio = () => setCurrentAudioIndex(i => (i === 0 ? audios.length - 1 : i - 1))
//   const nextAudio = () => setCurrentAudioIndex(i => (i === audios.length - 1 ? 0 : i + 1))

//   return (
//     <Box maxWidth={820} mx='auto'>
//       <Box border='1px solid #E5E7EB' borderRadius={1} overflow='hidden' display='flex' height={48} mb={4}>
//         <label htmlFor='file-input'>
//           <Button
//             variant='contained'
//             component='span'
//             sx={{ height: '100%', borderRadius: 0, fontSize: '0.9rem', width: '10rem' }}
//           >
//             بارگذاری فایل
//           </Button>
//         </label>

//         <Box sx={{ display: 'flex', alignItems: 'center', px: 2, fontSize: 13, color: '#6B7280', width: '100%' }}>
//           {files.length ? `${files.length} فایل انتخاب شده` : 'یک فایل انتخاب کنید'}
//         </Box>

//         <input id='file-input' type='file' multiple onChange={handleUpload} hidden />
//       </Box>

//       {videos.length > 0 && (
//         <Box position='relative' mb={4}>
//           <IconButton
//             onClick={prevVideo}
//             disabled={videos.length === 1}
//             sx={{ position: 'absolute', left: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
//           >
//             <ArrowBackIosNewIcon />
//           </IconButton>

//           <IconButton
//             onClick={nextVideo}
//             disabled={videos.length === 1}
//             sx={{ position: 'absolute', right: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
//           >
//             <ArrowForwardIosIcon />
//           </IconButton>

//           <Box border='1px solid #E5E7EB' borderRadius={2} overflow='hidden' bgcolor='#000'>
//             <Box display='flex' alignItems='center' justifyContent='space-between' px={2} py={1} bgcolor='#F9FAFB'>
//               <Typography fontSize={12} color='#374151'>
//                 {videos[currentVideoIndex].file.name}
//               </Typography>
//               <IconButton size='small' onClick={() => removeFile(videos[currentVideoIndex])}>
//                 <DeleteIcon fontSize='small' />
//               </IconButton>
//             </Box>

//             <video
//               key={videos[currentVideoIndex].preview}
//               src={videos[currentVideoIndex].preview}
//               controls
//               style={{ width: '100%', maxHeight: 420 }}
//             />

//             <Box display='flex' justifyContent='center' py={1} bgcolor='#F9FAFB'>
//               <Typography fontSize={12} color='#6B7280'>
//                 {currentVideoIndex + 1} / {videos.length}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {audios.length > 0 && (
//         <Box position='relative' mb={4}>
//           <IconButton
//             onClick={prevAudio}
//             disabled={audios.length === 1}
//             sx={{ position: 'absolute', left: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
//           >
//             <ArrowBackIosNewIcon />
//           </IconButton>

//           <IconButton
//             onClick={nextAudio}
//             disabled={audios.length === 1}
//             sx={{ position: 'absolute', right: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
//           >
//             <ArrowForwardIosIcon />
//           </IconButton>

//           <Box border='1px solid #E5E7EB' borderRadius={2} overflow='hidden'>
//             <Box display='flex' alignItems='center' justifyContent='space-between' px={2} py={1} bgcolor='#F9FAFB'>
//               <Typography fontSize={12} color='#374151'>
//                 {audios[currentAudioIndex].file.name}
//               </Typography>
//               <IconButton size='small' onClick={() => removeFile(audios[currentAudioIndex])}>
//                 <DeleteIcon fontSize='small' />
//               </IconButton>
//             </Box>

//             <Box display='flex' justifyContent='center' alignItems='center' py={4} bgcolor='#000'>
//               <audio
//                 key={audios[currentAudioIndex].preview}
//                 src={audios[currentAudioIndex].preview}
//                 controls
//                 style={{ width: '90%' }}
//               />
//             </Box>

//             <Box display='flex' justifyContent='center' py={1} bgcolor='#F9FAFB'>
//               <Typography fontSize={12} color='#6B7280'>
//                 {currentAudioIndex + 1} / {audios.length}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {images.length > 0 && (
//         <Box position='relative'>
//           <IconButton
//             onClick={prevImage}
//             disabled={images.length === 1}
//             sx={{ position: 'absolute', left: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
//           >
//             <ArrowBackIosNewIcon />
//           </IconButton>

//           <IconButton
//             onClick={nextImage}
//             disabled={images.length === 1}
//             sx={{ position: 'absolute', right: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
//           >
//             <ArrowForwardIosIcon />
//           </IconButton>

//           <Box border='1px solid #E5E7EB' borderRadius={2} overflow='hidden'>
//             <Box display='flex' alignItems='center' justifyContent='space-between' px={2} py={1} bgcolor='#F9FAFB'>
//               <Typography fontSize={12} color='#374151'>
//                 {images[currentImageIndex].file.name}
//               </Typography>
//               <IconButton size='small' onClick={() => removeFile(images[currentImageIndex])}>
//                 <DeleteIcon fontSize='small' />
//               </IconButton>
//             </Box>

//             <Box display='flex' justifyContent='center' bgcolor='#000'>
//               <img
//                 key={images[currentImageIndex].preview}
//                 src={images[currentImageIndex].preview}
//                 alt={images[currentImageIndex].file.name}
//                 style={{ maxHeight: 420, width: '100%', objectFit: 'contain' }}
//               />
//             </Box>

//             <Box display='flex' justifyContent='center' py={1} bgcolor='#F9FAFB'>
//               <Typography fontSize={12} color='#6B7280'>
//                 {currentImageIndex + 1} / {images.length}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import DeleteIcon from '@mui/icons-material/Delete'

type FileItem = {
  file: File
  preview: string
  type: 'video' | 'audio' | 'image' | 'pdf' | 'other'
}

type Props = {
  files: FileItem[]
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
  dataFiles: any[]
  disabled: any
}

export default function MultiFileViewer({ files, setFiles, dataFiles, disabled }: Props) {
  console.log(dataFiles, 'JLSJFLJSLDJFLSJDFLJSDLFJ')
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0)

  // 👇 فقط اضافه شده: تبدیل فایل‌های بک‌اند به ساختار viewer بدون تغییر UI
  useEffect(() => {
    if (!dataFiles || dataFiles.length === 0) return

    setFiles(prev => {
      if (prev.length > 0) return prev

      const mapped: FileItem[] = dataFiles.map((f: any) => {
        let type: FileItem['type'] = 'other'

        const ext = f.mime_type?.toLowerCase() || f.original_name?.split('.').pop()?.toLowerCase()

        if (['mp4', 'mov', 'avi', 'mpeg'].includes(ext)) type = 'video'
        else if (['mp3', 'wav', 'ogg'].includes(ext)) type = 'audio'
        else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext)) type = 'image'
        else if (ext === 'pdf') type = 'pdf'

        const fakeFile = new File([], f.original_name || f.name)

        return {
          file: fakeFile,
          preview: f.address, // ← لینک واقعی سرور
          type
        }
      })

      return mapped
    })
  }, [dataFiles, setFiles])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const newFiles: FileItem[] = Array.from(e.target.files).map(file => {
      let type: FileItem['type'] = 'other'

      if (file.type.startsWith('video')) type = 'video'
      else if (file.type.startsWith('audio')) type = 'audio'
      else if (file.type.startsWith('image')) type = 'image'
      else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) type = 'pdf'

      return {
        file,
        preview: URL.createObjectURL(file),
        type
      }
    })

    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (item: FileItem) => {
    if (item.preview.startsWith('blob:')) {
      URL.revokeObjectURL(item.preview)
    }

    setFiles(prev => {
      const updated = prev.filter(f => f !== item)

      if (currentVideoIndex >= updated.filter(f => f.type === 'video').length) {
        setCurrentVideoIndex(0)
      }
      if (currentImageIndex >= updated.filter(f => f.type === 'image').length) {
        setCurrentImageIndex(0)
      }
      if (currentAudioIndex >= updated.filter(f => f.type === 'audio').length) {
        setCurrentAudioIndex(0)
      }

      return updated
    })
  }

  const videos = files.filter(f => f.type === 'video')
  const images = files.filter(f => f.type === 'image')
  const audios = files.filter(f => f.type === 'audio')

  const prevVideo = () => setCurrentVideoIndex(i => (i === 0 ? videos.length - 1 : i - 1))
  const nextVideo = () => setCurrentVideoIndex(i => (i === videos.length - 1 ? 0 : i + 1))

  const prevImage = () => setCurrentImageIndex(i => (i === 0 ? images.length - 1 : i - 1))
  const nextImage = () => setCurrentImageIndex(i => (i === images.length - 1 ? 0 : i + 1))

  const prevAudio = () => setCurrentAudioIndex(i => (i === 0 ? audios.length - 1 : i - 1))
  const nextAudio = () => setCurrentAudioIndex(i => (i === audios.length - 1 ? 0 : i + 1))

  return (
    <Box maxWidth={820} mx='auto'>
      {!disabled && (
        <Box border='1px solid #E5E7EB' borderRadius={1} overflow='hidden' display='flex' height={48} mb={4}>
          <label htmlFor='file-input'>
            <Button
              variant='contained'
              component='span'
              sx={{ height: '100%', borderRadius: 0, fontSize: '0.9rem', width: '10rem' }}
            >
              بارگذاری فایل
            </Button>
          </label>

          <Box sx={{ display: 'flex', alignItems: 'center', px: 2, fontSize: 13, color: '#6B7280', width: '100%' }}>
            {files.length ? `${files.length} فایل انتخاب شده` : 'یک فایل انتخاب کنید'}
          </Box>

          <input id='file-input' type='file' multiple onChange={handleUpload} hidden />
        </Box>
      )}

      {videos.length > 0 && (
        <Box position='relative' mb={4}>
          <IconButton
            onClick={prevVideo}
            disabled={videos.length === 1}
            sx={{ position: 'absolute', left: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            onClick={nextVideo}
            disabled={videos.length === 1}
            sx={{ position: 'absolute', right: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          <Box border='1px solid #E5E7EB' borderRadius={2} overflow='hidden' bgcolor='#000'>
            <Box display='flex' alignItems='center' justifyContent='space-between' px={2} py={1} bgcolor='#F9FAFB'>
              <Typography fontSize={12} color='#374151'>
                {videos[currentVideoIndex].file.name}
              </Typography>
              <IconButton size='small' onClick={() => removeFile(videos[currentVideoIndex])}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Box>

            <video
              key={videos[currentVideoIndex].preview}
              src={videos[currentVideoIndex].preview}
              controls
              style={{ width: '100%', maxHeight: 420 }}
            />

            <Box display='flex' justifyContent='center' py={1} bgcolor='#F9FAFB'>
              <Typography fontSize={12} color='#6B7280'>
                {currentVideoIndex + 1} / {videos.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {audios.length > 0 && (
        <Box position='relative' mb={4}>
          <IconButton
            onClick={prevAudio}
            disabled={audios.length === 1}
            sx={{ position: 'absolute', left: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            onClick={nextAudio}
            disabled={audios.length === 1}
            sx={{ position: 'absolute', right: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          <Box border='1px solid #E5E7EB' borderRadius={2} overflow='hidden'>
            <Box display='flex' alignItems='center' justifyContent='space-between' px={2} py={1} bgcolor='#F9FAFB'>
              <Typography fontSize={12} color='#374151'>
                {audios[currentAudioIndex].file.name}
              </Typography>
              <IconButton size='small' onClick={() => removeFile(audios[currentAudioIndex])}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Box>

            <Box display='flex' justifyContent='center' alignItems='center' py={4} bgcolor='#000'>
              <audio
                key={audios[currentAudioIndex].preview}
                src={audios[currentAudioIndex].preview}
                controls
                style={{ width: '90%' }}
              />
            </Box>

            <Box display='flex' justifyContent='center' py={1} bgcolor='#F9FAFB'>
              <Typography fontSize={12} color='#6B7280'>
                {currentAudioIndex + 1} / {audios.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {images.length > 0 && (
        <Box position='relative'>
          <IconButton
            onClick={prevImage}
            disabled={images.length === 1}
            sx={{ position: 'absolute', left: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            onClick={nextImage}
            disabled={images.length === 1}
            sx={{ position: 'absolute', right: -48, top: '50%', transform: 'translateY(-50%)', bgcolor: '#F3F4F6' }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          <Box border='1px solid #E5E7EB' borderRadius={2} overflow='hidden'>
            <Box display='flex' alignItems='center' justifyContent='space-between' px={2} py={1} bgcolor='#F9FAFB'>
              <Typography fontSize={12} color='#374151'>
                {images[currentImageIndex].file.name}
              </Typography>
              <IconButton size='small' onClick={() => removeFile(images[currentImageIndex])}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Box>

            <Box display='flex' justifyContent='center' bgcolor='#000'>
              <img
                key={images[currentImageIndex].preview}
                src={images[currentImageIndex].preview}
                alt={images[currentImageIndex].file.name}
                style={{ maxHeight: 420, width: '100%', objectFit: 'contain' }}
              />
            </Box>

            <Box display='flex' justifyContent='center' py={1} bgcolor='#F9FAFB'>
              <Typography fontSize={12} color='#6B7280'>
                {currentImageIndex + 1} / {images.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
