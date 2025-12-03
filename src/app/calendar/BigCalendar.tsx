'use client';

import { useState} from 'react'
import { Calendar, dateFnsLocalizer, View, } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'en-US': enUS,
  };
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }), // Sunday
    getDay,
    locales,
  });
  
  // ---- Types ----
  export type CalendarEvent = {
    id: number | string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    desc?: string;
  };
  
  type BigCalendarProps = {
    events: CalendarEvent[];
  };  

const BigCalendar = ( { events }: BigCalendarProps) => {

    const [ view, setView ] = useState<View>('month');
    const [ date, setDate ] = useState<Date>(new Date());



  return (
      <div style={{ height: '80vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        tooltipAccessor="desc" // 👈 show description on hover
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        popup
      />
    </div>
  )
}

export default BigCalendar;