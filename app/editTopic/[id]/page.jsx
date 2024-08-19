import EditTopicForm from '@/components/EditTopicForm'
import { toast } from 'sonner'

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      toast.error('Failed to fetch topic')
      throw new Error('Failed to fetch topic')
    }

    return res.json()
  } catch (error) {
    console.log(error)
    // Xatolikni qayta ishlash yoki bo'sh natija qaytarish
    return { topic: null }
  }
}

export default async function EditTopic({ params }) {
  const { id } = params
  const { topic } = await getTopicById(id)
  
  if (!topic) {
    // Agar topic bo'lmasa, foydalanuvchiga habar berish yoki boshqa bir narsa qilish
    return <div>Topic not found</div>
  }
  
  const { title, description } = topic

  return <EditTopicForm title={title} description={description} id={id} />
}
