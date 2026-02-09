'use client'

import { Card, CardContent } from '@mui/material'
import MeetingsCalendarConsultation from './MeetingCalendarConsultation'
import { useCalendarConsultation } from '@/hooks/superUser/useCalendarConsultation'

export default function CalendarConsultation({ data, id }: any) {
  const { events, setSelectedEvent } = useCalendarConsultation()

  return (
    <Card>
      <CardContent>
        <MeetingsCalendarConsultation events={data?.meetings} onSelectEvent={setSelectedEvent} id={id} />
      </CardContent>
    </Card>
  )
}
