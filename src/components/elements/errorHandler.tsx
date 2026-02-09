export function GeTErrorFetch({ error, setError }: { error: any; setError: any }) {
  if (error?.response?.data?.message) {
    const messages: any = error?.response?.data?.message

    if (typeof messages === 'object') {
      Object.keys(messages).forEach(key => {
        if (Array.isArray(messages[key])) {
          setError(key as any, { type: 'server', message: messages[key][0] })
        } else {
          setError(key as any, { type: 'server', message: messages[key] })
        }
      })
    }
  }
}
