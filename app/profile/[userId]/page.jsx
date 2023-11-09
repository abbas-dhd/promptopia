'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

/**
 * Profile page for the other users (not logged in user)
 */
const UserProfile = ({ params }) => {
  console.log(params.userId);
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const userName = searchParams.get('username');

  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.userId}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (params.userId) fetchPosts();
  }, [params.userId]);

  return (
    <Profile
      name={`${userName ?? posts[0]?.creator?.username}'s`}
      desc={`Welcome to ${userName}'s profile page`}
      data={posts}
    />
  );
};

export default UserProfile;
