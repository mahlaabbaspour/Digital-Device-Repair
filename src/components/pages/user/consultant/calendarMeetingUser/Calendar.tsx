'use client'

import MeetingsCalendarUser from './MeetingCalendarUser'
import { Card, CardContent } from '@mui/material'

export default function CalendarUser({ data, id }: any) {
  return (
    <Card>
      <CardContent>
        <MeetingsCalendarUser events={data?.meetings} id={id} />
      </CardContent>
    </Card>
  )
}
