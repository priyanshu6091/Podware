import React, { useState } from 'react';
import { Menu, Search, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { user, signOut } = useAuth(); // Get the user from AuthContext
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // For dropdown visibility
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [searchResults, setSearchResults] = useState<string[]>([]); // Search results state

  const handleLogout = () => {
    signOut();
    setDropdownOpen(false);
    navigate('/signin'); // Redirect to SignIn
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Mock search results (replace with actual API call if needed)
    const mockResults = ['Podcast 1', 'Podcast 2', 'Episode 3'];
    const filteredResults = mockResults.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const renderNavigationTabs = () => {
    if (!user) return null;

    switch (user.role) {
      case 'User':
        return ['Settings'];
      case 'Admin':
        return ['Settings'];
      case 'Podcaster':
        return ['Settings'];
      default:
        return [];
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="p-2 rounded-md hover:bg-gray-100 lg:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="text-2xl font-bold text-purple-600 ml-2">Podware</div>
          </div>

          <div className="flex-1 max-w-xl mx-4 hidden lg:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((result, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          {result}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{user?.firstname || 'Guest'}</span>
            <div className="relative">
              <button onClick={toggleDropdown} className="p-2 rounded-full hover:bg-gray-100">
                <UserIcon className="h-6 w-6 text-gray-600" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                  {renderNavigationTabs()?.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => navigate(`/${tab.toLowerCase().replace(' ', '-')}`)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      {tab}
                    </button>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
