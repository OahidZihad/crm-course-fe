"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Lock, Bell, Mail, Camera, Save } from "lucide-react";

export default function StudentSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Oahid Zihad",
    email: "oahid@example.com",
    bio: "Passionate learner and aspiring developer.",
    avatar: "https://github.com/shadcn.png",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    security: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSaveProfile = () => {
    // Mock save
    alert("Profile updated successfully!");
  };

  const handleSavePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    // Mock password change
    alert("Password changed successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 border-b-4 border-border pb-6">
        <div className="h-16 w-16 bg-primary border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] flex items-center justify-center">
          <User className="h-8 w-8 text-black" />
        </div>
        <div>
          <h1 className="text-4xl font-bold uppercase">Settings</h1>
          <p className="text-gray-600 font-bold">
            Manage your profile and account preferences
          </p>
        </div>
      </div>

      {/* Profile Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold uppercase flex items-center gap-2">
          <User className="h-6 w-6" /> Profile Information
        </h2>
        <div className="bg-white border-2 border-border p-6 shadow-[8px_8px_0px_0px_#a8a6ff]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-32 w-32 border-4 border-border overflow-hidden">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="outline"
                className="w-full font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff]"
              >
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>

            {/* Fields */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full border-2 border-border p-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full border-2 border-border p-3 font-bold bg-gray-100 cursor-not-allowed opacity-75"
                  />
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    Contact support to change email
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 uppercase">
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full border-2 border-border p-3 font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff] resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleSaveProfile}
                  className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold uppercase flex items-center gap-2">
          <Lock className="h-6 w-6" /> Security
        </h2>
        <div className="bg-white border-2 border-border p-6 shadow-[8px_8px_0px_0px_#a8a6ff]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 uppercase">
                Current Password
              </label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
                className="w-full border-2 border-border p-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 uppercase">
                New Password
              </label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
                className="w-full border-2 border-border p-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 uppercase">
                Confirm Password
              </label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
                className="w-full border-2 border-border p-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-[4px_4px_0px_0px_#a8a6ff]"
              />
            </div>
          </div>
          <div className="pt-6">
            <Button
              onClick={handleSavePassword}
              variant="outline"
              className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_#a8a6ff] hover:bg-black hover:text-white"
            >
              Update Password
            </Button>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold uppercase flex items-center gap-2">
          <Bell className="h-6 w-6" /> Preferences
        </h2>
        <div className="bg-white border-2 border-border p-6 shadow-[8px_8px_0px_0px_#a8a6ff]">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-2 border-border">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-blue-100 border-2 border-border flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">Email Notifications</h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Receive updates about your courses and progress
                  </p>
                </div>
              </div>
              <div
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    email: !notifications.email,
                  })
                }
                className={`w-14 h-8 flex items-center border-2 border-border rounded-full p-1 cursor-pointer transition-colors ${
                  notifications.email ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full border-2 border-border shadow-sm transform transition-transform ${
                    notifications.email ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-border">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-yellow-100 border-2 border-border flex items-center justify-center">
                  <Bell className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold">Marketing Emails</h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Receive tips, trends, and promotional offers
                  </p>
                </div>
              </div>
              <div
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    marketing: !notifications.marketing,
                  })
                }
                className={`w-14 h-8 flex items-center border-2 border-border rounded-full p-1 cursor-pointer transition-colors ${
                  notifications.marketing ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full border-2 border-border shadow-sm transform transition-transform ${
                    notifications.marketing ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
