import axios from 'axios';
import { API_URL } from '../../../../constants/global';
import { User } from '../../../../types/UserTypes';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useContext } from 'react';
import { AdminEditUserModal } from './AdminEditUserModal';

export const AdminAllUsersTab = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { access_token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  const handleUserEditSubmit = async (newRole: string) => {
    if (!access_token) {
      alert('You are not authorized to perform this action.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    try {
      // PUT request:
      if (selectedUser) {
        await axios.put(
          `${API_URL}/auth/user/update-role/${selectedUser?._id}`,
          { role: newRole },
          config
        );
      }

      setIsModalOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.log(error);
      alert('Failed to edit a user');
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="admin-tab">
      <h2>All Users</h2>

      {isLoading ? (
        <p>Is loading...</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="primary-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <AdminEditUserModal
          onModalClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={(formData) => handleUserEditSubmit(formData.role)}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};
