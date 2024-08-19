'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          newTitle,
          newDescription,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to update topic')
      }

      router.push('/')
      router.refresh()
      toast.success('Topic updated successfully')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        type="text"
        className="border border-stone-500 px-8 py-2"
        placeholder="Topic Title"
      />
      <input
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        type="text"
        className="border border-stone-500 px-8 py-2"
        placeholder="Topic Description"
      />
      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  )
}
