import React from "react";
import { useUser } from "../context/UserContext";

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Please log in to view your profile.
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Your Profile</h1>
        <p className="mb-2"><span className="font-semibold">Name:</span> {user.username}</p>
        <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
        {/* Add more user info as needed */}
      </div>
    </div>
  );
};

export default ProfilePage;
