import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { title, description } = await request.json()
  await connectMongoDB()
  await Topic.create({
    title,
    description,
  })
  return NextResponse.json(
    { message: 'Topic added successfully' },
    { status: 201 }
  )
}

export async function GET() {
  try {
    await connectMongoDB()
    const topics = await Topic.find()
    return NextResponse.json({ topics })
  } catch (error) {
    console.error('Error fetching topics:', error)
    return NextResponse.json(
      { message: 'Failed to fetch topics', error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    await connectMongoDB()

    const deletedTopic = await Topic.findByIdAndDelete(id)

    if (!deletedTopic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Topic deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete topic', error: error.message },
      { status: 500 }
    )
  }
}
