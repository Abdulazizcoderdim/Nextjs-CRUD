'use client'

import { useRouter } from 'next/navigation'
import { HiOutlineTrash } from 'react-icons/hi'
import { toast } from 'sonner'

export default function RemoveBtn({ id }) {
  const router = useRouter()
  const removeTopic = async () => {
    const confirmed = confirm('Are you sure?')

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) {
        router.refresh()
        toast.success('Topic deleted successfully')
      }
    }
  }
  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  )
}
