export interface IUser {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: "Admin" | "Editor" | "Viewer";
    department: string;
    location: string;
    joinDate: string;
    isActive: boolean;
  }
  