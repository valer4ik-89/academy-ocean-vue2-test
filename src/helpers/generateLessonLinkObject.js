export const generateLessonLinkObject = (lesson) => ({
  id: lesson.id,
  title: lesson.title,
  to: {
    name: 'lesson',
    params: {
      id: lesson.id,
    }
  }
})