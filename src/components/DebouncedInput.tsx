'use client'

import { useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'

type Props = {
  value?: string
  delay?: number
  placeholder?: string
  onChange: (value: string) => void
}

export default function DebouncedInput({ value = '', delay = 500, placeholder = 'جستجو...', onChange }: Props) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [inputValue, delay, onChange])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <TextField
      size='small'
      value={inputValue}
      placeholder={placeholder}
      onChange={e => setInputValue(e.target.value)}
    />
  )
}
