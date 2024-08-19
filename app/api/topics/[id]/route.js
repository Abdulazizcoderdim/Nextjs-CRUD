import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    const { newTitle: title, newDescription: description } =
      await request.json()
    await connectMongoDB()

    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    )

    if (!updatedTopic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Topic updated successfully', updatedTopic },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update topic', error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }
    await connectMongoDB()
    const topic = await Topic.findOne({ _id: id })
    return NextResponse.json({ topic }, { status: 200 })
  } catch (error) {
    console.log('Topic error', error)
  }
}
