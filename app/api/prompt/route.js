import { Prompt } from '@models/prompt';
import { connectToDB } from '@utils/database';
import { NextRequest } from 'next/server';

export const GET = async (req) => {
  try {
    const searchQuery = req.nextUrl.searchParams.get('search');

    await connectToDB();
    const prompts = await Prompt.find({
      $or: [
        { prompt: { $regex: searchQuery, $options: 'i' } },
        { tag: { $regex: searchQuery, $options: 'i' } },
        { userName: { $regex: searchQuery, $options: 'i' } },
      ],
    }).populate('creator');

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch', {
      status: 500,
    });
  }
};
