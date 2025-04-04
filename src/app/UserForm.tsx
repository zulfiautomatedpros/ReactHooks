"use client";
import { useState, FormEvent } from "react";
import { IUser } from "./types";

interface UserFormProps {
  initialData?: Partial<IUser>;
  onSubmit: (data: Partial<IUser>) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [role, setRole] = useState<"Admin" | "Editor" | "Viewer">(initialData?.role as "Admin" | "Editor" | "Viewer" || "Viewer");
  const [isActive, setIsActive] = useState(initialData?.isActive || false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, role, isActive });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
      <h2 className="text-xl font-bold">{initialData ? "Edit User" : "Add User"}</h2>
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="border p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Role</label>
        <select
          className="border p-2 rounded w-full"
          value={role}
          onChange={(e) => setRole(e.target.value as "Admin" | "Editor" | "Viewer")}
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active
        </label>
      </div>
      <div className="flex gap-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {initialData ? "Update" : "Create"}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
