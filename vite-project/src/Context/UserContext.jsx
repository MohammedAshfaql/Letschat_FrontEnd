// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch user data from backend when component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           // Decode the token to extract the user ID
//           const userId = JSON.parse(atob(token.split('.')[1])).id;

//           const config = {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           };

//           // Fetch user data using the user ID
//           const { data } = await axios.get(
//             `https://lastcode.onrender.com/user/id/${userId}`,
            
//             config
//           );
//           setUser(data); // Update user state with the fetched data
//         } else {
//           console.warn('No token found. Redirecting to login.');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Function to search users by name or email
//   const searchUsers = async (query) => {
//     if (!query) return;

//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const { data } = await axios.get(
//           `https://lastcode.onrender.com/user/search?name=${query}`,
          
//           config
//         );
//         setSearchResults(data);
//       } else {
//         console.warn('No token found. Cannot perform search.');
//       }
//     } catch (error) {
//       console.error('Error searching users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <UserContext.Provider
//       value={{ user, login, logout, searchUsers, searchResults, loading }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };



import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user data from backend when component mounts
  useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = localStorage.getItem('token');
            if (token) {
              // Decode the token to extract the user ID
              const userId = JSON.parse(atob(token.split('.')[1])).id;
    
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
    
              // Fetch user data using the user ID
              const { data } = await axios.get(
                `https://lastcode.onrender.com/user/id/${userId}`,
                
                config
              );
              setUser(data); // Update user state with the fetched data
            } else {
              console.warn('No token found. Redirecting to login.');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);

  // Function to search users by name or email
  const searchUsers = async (query) => {
        if (!query) return;
    
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
    
            const { data } = await axios.get(
              `https://lastcode.onrender.com/user/search?name=${query}`,
              
              config
            );
            setSearchResults(data);
          } else {
            console.warn('No token found. Cannot perform search.');
          }
        } catch (error) {
          console.error('Error searching users:', error);
        } finally {
          setLoading(false);
        }
      };
    
      const login = (userData) => {
        setUser(userData);
      };
    
      const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
      };


  return (
    <UserContext.Provider
      value={{ user, login, logout, searchUsers, searchResults, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};