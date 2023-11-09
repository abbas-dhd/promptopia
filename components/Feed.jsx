'use client';
import { useCallback, useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { debounce } from 'lodash';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const fetchPosts = async (searchQuery) => {
    const response = await fetch(
      `/api/prompt?search=${searchQuery.replace('#', '').toString()}`
    );
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    const debouncedFetchPost = debounce(fetchPosts, 500);
    debouncedFetchPost(searchText);

    return () => debouncedFetchPost.cancel();
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          className="search_input peer"
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
