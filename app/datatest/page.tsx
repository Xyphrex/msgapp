"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type User = {
  user_id: number;
  email: string;
  username: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("users") // your table name
          .select("user_id, email, username") // select only safe fields
          .order("user_id", { ascending: true });

        if (error) {
          console.error("Error fetching users:", error);
        } else {
          setUsers(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-8 text-lg font-medium">Loading users...</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.user_id}
              className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <span className="font-medium">{user.username}</span>
              <span className="text-gray-500">{user.email}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
