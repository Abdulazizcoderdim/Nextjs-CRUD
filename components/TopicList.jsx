import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import RemoveBtn from './RemoveBtn'

const getTopics = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/topics', {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch topics')
    }

    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default async function TopicList() {
  const { topics } = await getTopics()
  return (
    <>
      {topics.map((item, i) => (
        <div
          key={i}
          className="p-4 border items-start border-slate-300 my-3 flex justify-between gap-5"
        >
          <div className="">
            <h2 className="font-bold text-2xl">{item.title}</h2>
            <div className="">{item.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={item._id} />
            <Link href={`/editTopic/${item._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}
