import { lessons } from '@/mocks/lessons.json'

const fetchAllLessons = () => lessons
const fetchLessonById = (id) => lessons.find(item => item.id == id)

export {
  fetchAllLessons,
  fetchLessonById,
}