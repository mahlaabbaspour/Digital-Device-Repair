'use client'

type PdfViewerProps = {
  fileUrl: string
  height?: number
  width?: number
}

const PdfViewer = ({ fileUrl, height = 600, width = 1300 }: PdfViewerProps) => {
  return (
    <iframe
      src={fileUrl + '#toolbar=0&navpanes=0&scrollbar=0'}
      width={width}
      height={height}
      style={{ border: '1px solid #ccc' }}
      title='PDF Viewer'
    />
  )
}

export default PdfViewer
