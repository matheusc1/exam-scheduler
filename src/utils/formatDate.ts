import dayjs from 'dayjs'

export function formatDate(date: Date, selectedHour: string) {
  const [hours, minutes] = selectedHour.split(':').map(Number)

  const selectedDate = dayjs(date).set('hour', hours).set('minute', minutes)

  const finalHour = selectedDate.add(1, 'hour')

  return selectedDate.format(
    `DD/MM [de] HH:mm [até] ${finalHour.format('HH:mm')}`
  )
}
