import dayjs from 'dayjs'

import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.locale('pt-br')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/Sao_Paulo')

export function formatDate(date: string) {
  const selectedDate = dayjs(date)
  const finalHour = selectedDate.add(1, 'hour')

  return selectedDate.format(
    `DD/MM [de] HH:mm [até] ${finalHour.format('HH:mm')}`
  )
}
