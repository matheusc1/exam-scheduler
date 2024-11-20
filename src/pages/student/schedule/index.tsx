import { ScheduleCard } from './schedule-card'
import { useAuth } from '@/context/auth-context'
import { useQuery } from '@tanstack/react-query'
import { getEnrollmentsByRa } from '@/http/student/get-enrollments-by-ra'
import { getScheduledExams } from '@/http/student/get-scheduled-exams'

interface Exam {
  id: string
  enrollmentId: string
  disciplineName: string
  type: string
}

interface Enrollment {
  enrollmentId: string
  disciplineName: string
  periodStartDate: string
  periodEndDate: string
}

interface ExamScheduled {
  id: string
  enrollmentId: string
  discipline: string
  type: string
  scheduledDate: Date
}

export function Schedule() {
  const { student } = useAuth()

  const { data: enrollmentData } = useQuery<Enrollment[]>({
    queryKey: ['get-enrollments', student?.ra],
    queryFn: () => getEnrollmentsByRa({ studentRa: student?.ra! }),
    enabled: !!student?.ra,
  })

  const { data: examsScheduled } = useQuery<ExamScheduled[]>({
    queryKey: ['get-scheduled-exams', student?.ra],
    queryFn: () => getScheduledExams({ studentRa: student?.ra! }),
    enabled: !!student?.ra,
  })

  const exams: Exam[] = enrollmentData?.length
    ? enrollmentData.flatMap((enrollment: Enrollment) => [
        {
          id: crypto.randomUUID(),
          enrollmentId: enrollment.enrollmentId,
          disciplineName: enrollment.disciplineName,
          type: 'mandatory',
        },
        {
          id: crypto.randomUUID(),
          enrollmentId: enrollment.enrollmentId,
          disciplineName: enrollment.disciplineName,
          type: 'substitute',
        },
      ])
    : []

  const examsToSchedule = exams.filter(exam => {
    return !examsScheduled?.some(
      scheduled =>
        scheduled.enrollmentId === exam.enrollmentId &&
        scheduled.type === (exam.type === 'mandatory' ? 'A2' : 'A3')
    )
  })

  return (
    <>
      <div className="my-10 flex flex-col flex-wrap sm:flex-row gap-10 items-center sm:items-start">
        {examsScheduled?.map(scheduledExam => (
          <ScheduleCard
            key={scheduledExam.id}
            scheduleId={scheduledExam.id}
            enrollmentId={scheduledExam.enrollmentId}
            discipline={scheduledExam.discipline}
            type={scheduledExam.type}
            scheduledDate={scheduledExam.scheduledDate}
            isScheduled={true}
          />
        ))}
        {examsToSchedule?.map(exam => (
          <ScheduleCard
            enrollmentId={exam.enrollmentId}
            key={exam.id}
            discipline={exam.disciplineName}
            type={exam.type}
          />
        ))}
        {!enrollmentData?.length && (
          <div className="text-center w-full">Sem provas para realizar</div>
        )}
      </div>
    </>
  )
}
