import { useState } from 'react'
import { CalendarEvent } from '@/types/calendar'
import { initialEvents } from '@/data/calendarEvents'

export function useCalendarConsultation() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  //   const addEvent = (event: CalendarEvent) => {
  //     setEvents(prev => [...prev, event])
  //   }

  const updateEvent = (updated: CalendarEvent) => {
    setEvents(prev => prev.map(ev => (ev.id === updated.id ? updated : ev)))
  }

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(ev => ev.id !== id))
  }

  return {
    events,
    selectedEvent,
    setSelectedEvent,
    updateEvent,
    deleteEvent
  }
}
