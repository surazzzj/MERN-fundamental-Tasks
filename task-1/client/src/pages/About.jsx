import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const About = () => {
  const { backendUrl, token, user, setUser, setToken } = useContext(AppContext);

  useEffect(() => {
    if (!token) return;

    const loadUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/getdata`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.error(error);
        setToken(null);
        localStorage.removeItem('token');
      }
    };

    loadUser();
  }, [token, backendUrl, setUser, setToken]);

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="h-screen bg-black text-white flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-5xl font-medium">About Page</h1>
        {!user ? (
          <p className="mt-4">Loading user data...</p>
        ) : (
          <div className="mt-6">
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
