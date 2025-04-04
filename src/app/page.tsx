"use client";
import { AuthProvider, useAuth } from "./AuthContext";
import { ThemeProvider, useTheme } from "./ThemeContext";
import UserDashboard from "./UserDashboard";
import LoginPage from "./LoginPage";
import { IUser } from "./types";
import { useState } from "react";

const initialUsers: IUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "Admin",
    department: "IT",
    location: "New York",
    joinDate: "2020-01-15",
    isActive: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "Editor",
    department: "Content",
    location: "Los Angeles",
    joinDate: "2021-03-20",
    isActive: true,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    role: "Viewer",
    department: "Marketing",
    location: "Chicago",
    joinDate: "2019-11-05",
    isActive: false,
  },
  {
    id: 4,
    name: "Sara Williams",
    email: "sara@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    role: "Editor",
    department: "Design",
    location: "Seattle",
    joinDate: "2022-05-10",
    isActive: true,
  },
  {
    id: 5,
    name: "Mike Brown",
    email: "mike@example.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    role: "Viewer",
    department: "Sales",
    location: "Boston",
    joinDate: "2021-08-15",
    isActive: false,
  },
];

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="absolute top-4 right-4 flex gap-2 z-50">
      <button onClick={toggleTheme} className="bg-gray-700 text-white px-4 py-2 rounded">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
      {user && (
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      )}
    </header>
  );
}

function MainContent() {
  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const { user } = useAuth();

  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        <Header />
        <div className="pt-20">
          {!user ? (
            <LoginPage users={users} />
          ) : (
            <main className="p-8">
              <UserDashboard users={users} onUsersChange={setUsers} />
            </main>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default function HomePage() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
