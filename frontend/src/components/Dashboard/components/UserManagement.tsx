import axios from 'axios';
import { API_URL } from '../../../constants/global';
import { User } from '../../../types/UserTypes';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { access_token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const response = await axios.get<User[]>(`${API_URL}/auth/users`, config);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchUsers();
    }
  }, [access_token]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="admin-tab">
      <h2>All Reservations</h2>

      {isLoading ? (
        <p>Is loading...</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
