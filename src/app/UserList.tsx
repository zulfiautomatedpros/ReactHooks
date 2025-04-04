"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserCard from "./UserCard";
import { IUser } from "./types";

interface UserListProps {
  users: IUser[];
  onViewProfile: (user: IUser) => void;
  onEditUser: (user: IUser) => void;
  onDeleteUser: (userId: number) => void;
  viewMode: "card" | "list";
}

const UserList: React.FC<UserListProps> = ({ users, onViewProfile, onEditUser, onDeleteUser, viewMode }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const filteredUsers = users.filter((user) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm);

    let matchesFilter = true;
    if (filter === "active") {
      matchesFilter = user.isActive;
    } else if (filter === "inactive") {
      matchesFilter = !user.isActive;
    }
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "active" | "inactive")}
          className="border p-2 rounded"
        >
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="inactive">Inactive Users</option>
        </select>
      </div>
      {viewMode === "card" ? (
        filteredUsers.length > 0 ? (
          <motion.div layout className="grid gap-4">
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onViewProfile={onViewProfile}
                  onEditUser={onEditUser}
                  onDeleteUser={onDeleteUser}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <p>No users found</p>
        )
      ) : (
        filteredUsers.length > 0 ? (
          <motion.table layout className="w-full border" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">
                    {user.isActive ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-red-600">Inactive</span>
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => onViewProfile(user)}>
                        View
                      </button>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => onEditUser(user)}>
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDeleteUser(user.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        ) : (
          <p>No users found</p>
        )
      )}
    </div>
  );
};

export default UserList;
