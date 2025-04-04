"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { IUser } from "./types";

interface UserCardProps {
  user: IUser;
  onViewProfile: (user: IUser) => void;
  onEditUser: (user: IUser) => void;
  onDeleteUser: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onViewProfile, onEditUser, onDeleteUser }) => {
  return (
    <motion.div 
      className="border p-4 rounded shadow-md flex items-center gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <Image src={user.avatar} alt={user.name} width={50} height={50} className="rounded-full" />
      <div className="flex-1">
        <h2 className="font-bold">{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.role}</p>
        <span
          className={`px-2 py-1 rounded ${
            user.isActive ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => onViewProfile(user)}>
          View
        </button>
        <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => onEditUser(user)}>
          Edit
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => onDeleteUser(user.id)}>
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default UserCard;
