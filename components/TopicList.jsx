import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import RemoveBtn from './RemoveBtn'

export default function TopicList() {
  return (
    <>
      <div className="p-4 border items-start border-slate-300 my-3 flex justify-between gap-5">
        <div className="">
          <h2 className="font-bold text-2xl">Topic List</h2>
          <div className="">Topic description</div>
        </div>
        <div className="flex gap-2">
          <RemoveBtn />
          <Link href={'/editTopic/123'}>
            <HiPencilAlt size={24} />
          </Link>
        </div>
      </div>
    </>
  )
}
