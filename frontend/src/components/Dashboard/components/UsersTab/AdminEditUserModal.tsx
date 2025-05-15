import '../../../ReservationModal/reservation-modal.css';
import { useState, useEffect } from 'react';
import { User } from '../../../../types/UserTypes';

interface AdminEditUserModalProps {
  onModalClose: () => void;
  onSubmit: (formData: { role: string }) => void;
  selectedUser: User | null;
}

export const AdminEditUserModal = ({
  onModalClose,
  onSubmit,
  selectedUser,
}: AdminEditUserModalProps) => {
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    if (selectedUser) {
      setRole(selectedUser.role);
    }
  }, [selectedUser]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      role,
    };
    onSubmit(formData);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close" onClick={onModalClose}>
            x
          </span>
          <h2>Edit User Role</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="role">User Role:</label>
              <select
                id="role"
                value={role}
                required
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="modal-actions">
              <button type="submit">Update User</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
