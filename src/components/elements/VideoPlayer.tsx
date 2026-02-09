import { useState } from 'react'

const VideoPlayer = ({ videos, onRemove }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? videos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev === videos.length - 1 ? 0 : prev + 1))
  }

  const handleRemove = () => {
    onRemove(currentIndex)

    if (currentIndex >= videos.length - 1) {
      setCurrentIndex(0)
    }
  }

  if (!videos.length) return null

  return (
    //@ts-ignore
    <div style={styles.container}>
      <h3>{videos[currentIndex].name}</h3>

      <video key={videos[currentIndex].address} src={videos[currentIndex].address} controls style={styles.video} />

      <div style={styles.buttons}>
        <button onClick={handlePrev}>⏮ Prev</button>
        <button onClick={handleRemove}>🗑 حذف</button>
        <button onClick={handleNext}>Next ⏭</button>
      </div>

      <small>
        {currentIndex + 1} / {videos.length}
      </small>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '20px'
  },
  video: {
    width: '80%',
    maxHeight: '450px',
    borderRadius: '10px',
    border: '2px solid #333'
  },
  buttons: {
    display: 'flex',
    gap: '10px'
  }
}

export default VideoPlayer
