import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.locale('pt-br')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/Sao_Paulo')

export function formatScheduledDate(date: Date) {
  const scheduledDate = dayjs(date)
  const finalHour = scheduledDate.add(1, 'hour')

  return scheduledDate.format(`DD/MM | HH:mm - ${finalHour.format('HH:mm')}`)
}
