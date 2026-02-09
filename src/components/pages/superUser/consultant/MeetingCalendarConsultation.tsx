'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { CalendarEvent } from '../../../../types/calendar'

import '@/styles/fullcalendar-custom.css'
import { useState } from 'react'
import ModalMeetConsultation from './ModalMeetConsultation'
import { fetchShowMeet } from '@/libs/superUser/documentConsultant'

type Props = {
  events: CalendarEvent[]
  onSelectEvent: (event: CalendarEvent) => void
  id: string
}

export default function MeetingsCalendarConsultation({ events, onSelectEvent, id }: Props) {
  const [open, setOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const handleEventClick = async (event: CalendarEvent) => {
    const data = await fetchShowMeet({ id: id, rowId: event?.id })
    if (data) {
      setOpen(true)
      setSelectedEvent(data)
    }
  }

  const handleClose = () => setOpen(false)
  return (
    <>
      <ModalMeetConsultation
        id={id}
        open={open}
        onClose={handleClose}
        title='جلسه مشاوره'
        description='می توانید  جزئیات جلسه مشاوره را مشاهده کنید'
        selectedEvent={selectedEvent}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        editable={false}
        locale='fa'
        direction='rtl'
        events={events}
        eventClassNames={({ event }) => [`bg-${event.extendedProps.bg_color}`]}
        eventClick={({ event }) => {
          handleEventClick({
            id: event.id,
            title: event.title,
            start: event.start!,
            end: event.end!,
            allDay: event.allDay,
            extendedProps: event.extendedProps as any
          })
        }}
        headerToolbar={{
          start: 'prev,next,today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        }}
        buttonText={{
          today: 'امروز',
          month: 'ماه',
          week: 'هفته',
          day: 'روز',
          list: 'لیست',
          prev: 'قبلی',
          next: 'بعدی'
        }}
      />
    </>
  )
}
