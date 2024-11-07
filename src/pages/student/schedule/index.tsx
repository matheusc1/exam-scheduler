import { ScheduleCard } from './schedule-card'

const mandatoryExam = {
  discpline: 'IA - Machine Learning',
  type: 'A2',
  availableSlots: [
    { time: '09:00', spots: 3 },
    { time: '10:00', spots: 2 },
    { time: '11:00', spots: 0 },
    { time: '12:00', spots: 1 },
    { time: '13:00', spots: 3 },
    { time: '14:00', spots: 4 },
    { time: '15:00', spots: 0 },
    { time: '16:00', spots: 5 },
    { time: '17:00', spots: 1 },
    { time: '18:00', spots: 0 },
    { time: '19:00', spots: 0 },
  ],
}

const substituteExam = {
  discpline: 'IA - Machine Learning',
  type: 'A3',
  availableSlots: [
    { time: '09:00', spots: 0 },
    { time: '10:00', spots: 2 },
    { time: '11:00', spots: 0 },
    { time: '12:00', spots: 0 },
    { time: '13:00', spots: 3 },
    { time: '14:00', spots: 4 },
    { time: '15:00', spots: 0 },
    { time: '16:00', spots: 5 },
    { time: '17:00', spots: 1 },
    { time: '18:00', spots: 0 },
    { time: '19:00', spots: 1 },
  ],
}

export function Schedule() {
  return (
    <>
      <div className="my-10 flex flex-col sm:flex-row gap-10 items-center sm:items-start">
        <ScheduleCard
          discpline={mandatoryExam.discpline}
          type={mandatoryExam.type}
          availableSlots={mandatoryExam.availableSlots}
        />

        <ScheduleCard
          discpline={substituteExam.discpline}
          type={substituteExam.type}
          availableSlots={substituteExam.availableSlots}
        />
      </div>
    </>
  )
}
