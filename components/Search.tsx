import { useState } from 'react';

interface SearchProps {
  posts: { id: string; title: string }[];
  onSearch: (filteredPosts: { id: string; title: string }[]) => void;
}

const Search: React.FC<SearchProps> = ({ posts, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );
    onSearch(filteredPosts);
  };

  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={query}
      onChange={handleSearch}
      className="search-input"
    />
  );
};

export default Search;