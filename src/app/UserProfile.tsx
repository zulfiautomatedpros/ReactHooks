"use client";
import Image from "next/image";
import { IUser } from "./types";
import { motion } from "framer-motion";

interface UserProfileProps {
  user: IUser;
  onEdit: (user: IUser) => void;
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit, onBack }) => {
  if (!user) return null;

  return (
    <motion.div 
      className="border p-6 rounded shadow-md space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="flex items-center gap-4">
        <Image src={user.avatar} alt={user.name} width={80} height={80} className="rounded-full" />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-1">Role: {user.role}</p>
          <p className="mt-1">
            Status:{" "}
            <span className={`px-2 py-1 rounded ${user.isActive ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </p>
          <p className="mt-1">Department: {user.department}</p>
          <p className="mt-1">Location: {user.location}</p>
          <p className="mt-1">Join Date: {user.joinDate}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => onEdit(user)} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Edit Profile
        </button>
        <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">
          Back to List
        </button>
      </div>
    </motion.div>
  );
};

export default UserProfile;
