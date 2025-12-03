"use client";

import { useActionState } from "react";
import { useEffect, useState } from 'react';
import Modal from "./Modal";
import BigCalendar, { CalendarEvent } from "./BigCalendar";

const mockEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Kickoff Meeting',
    desc: 'Test description 1',
    start: new Date(2025, 10, 10, 10, 0),
    end: new Date(2025, 3, 10, 11, 0),
  },
  {
    id: 2,
    title: 'All-day Event',
    desc: 'This is my description, feel free to let me know',
    start: new Date(2025, 10, 29),
    end: new Date(2025, 10, 29),
    allDay: true,
  },
];



export default function CalendarForm({action} : { action: any}) {
    const [state, formAction] = useActionState(action, { success: false});
    const [openModal, setOpenModal] = useState(false);
    
    useEffect(() => {
        if (state?.success) {
          setOpenModal(true);
        }
      }, [state]);
    

    return (
        <>
            <form action={formAction}>
            <input name="query" placeholder="Type something..." />
            <button type="submit">Submit</button>
            </form>

            <main style={{ padding: 24 }}>
      <h1>Calendar</h1>
      <BigCalendar events={mockEvents} />
    </main>


            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <h2>Confirmed!</h2>
                <p>Your request was processed successfully.</p>
            </Modal>
        </>
      );
    
}