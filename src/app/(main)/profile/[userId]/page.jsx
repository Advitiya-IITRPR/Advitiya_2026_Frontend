"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Edit2, Key, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import { StarsBackground } from "@/components/StarsBackground";

const ProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [participations, setParticipations] = useState([]);

  // Uncomment when API is ready
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await axios
          .get(`/api/user/profile/${params.userId}`)
          .then((response) => {
            setUserData(response.data.data);
            setParticipations(response.data.data.participation || []);
          })
          .catch(() => {
            toast.error(data.message || "Failed to fetch user data");
          })
          .finally(() => {
            setLoading(false);
          });
      } catch {
        toast.error("Error while fetching user");
      }
    };

    fetchUserData();
  }, [params.userId]);

  const handleVerify = () => {
    router.push(`/verifyotp/${params.userId}`);
  };

  const handleEditProfile = () => {
    router.push(`/profile/${params.userId}/edit`);
  };

  const handleResetPassword = () => {
    router.push(`/profile/${params.userId}/reset-password`);
  };

  if (loading) {
    return (
      <main className="relative min-h-screen">
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-blue-950">
          <StarsBackground className="w-full h-full" showShootingStars={true} />
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen mt-20">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-blue-950">
        <StarsBackground className="w-full h-full" showShootingStars={true} />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center flex flex-col items-center justify-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-2"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-2">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(34,211,238,0.8)]">
                MY PROFILE
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-cyan-100 mt-6 mb-10 drop-shadow-[0_2px_15px_rgba(0,0,0,1)] font-medium"
          >
            Manage your account and view your participations
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 -mt-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Profile Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#021334] rounded-xl shadow-lg p-10 sticky top-8">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-base font-semibold text-blue-200 mb-1">
                      Full Name
                    </h2>
                    <p className="text-xl font-medium text-white">
                      {userData?.userName}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-blue-200 mb-1">
                      Email
                    </h2>
                    <p className="text-xl font-medium text-white">
                      {userData?.email}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-blue-200 mb-1">
                      Mobile Number
                    </h2>
                    <p className="text-xl font-medium text-white">
                      {userData?.mobileNo}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-blue-200 mb-1">
                      Verification Status
                    </h2>
                    <div className="mt-2">
                      {userData?.isVerified ? (
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-medium text-lg">Verified Account</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-red-400">
                            <XCircle className="w-6 h-6" />
                            <span className="font-medium text-lg">Not Verified</span>
                          </div>
                          <Button
                            onClick={handleVerify}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-14"
                          >
                            Verify Now
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-4 space-y-3">
                    <Button
                      onClick={handleEditProfile}
                      className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-lg h-14"
                    >
                      <Edit2 className="w-5 h-5" />
                      Edit Profile
                    </Button>
                    <Button
                      onClick={handleResetPassword}
                      className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white text-lg h-14"
                    >
                      <Key className="w-5 h-5" />
                      Reset Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Participations Section */}
            <div className="lg:col-span-8">
              <div className="bg-[#021334] rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Event Participations
                </h2>
                <div className="overflow-hidden">
                  <Table>
                    <TableCaption className="text-blue-200 text-base mt-4">
                      Your event participation history
                    </TableCaption>
                    <TableHeader>
                      <TableRow className="border-blue-300">
                        <TableHead className="font-semibold text-white text-lg py-4">
                          Event Name
                        </TableHead>
                        <TableHead className="font-semibold text-white text-lg py-4">
                          Team Name
                        </TableHead>
                        <TableHead className="font-semibold text-white text-lg py-4">
                          Participants
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {participations.length === 0 ? (
                        <TableRow className="border-blue-300">
                          <TableCell colSpan={3} className="text-center py-10">
                            <div className="space-y-3">
                              <p className="text-blue-100 text-xl">
                                You haven't participated in any events yet
                              </p>
                              <Button
                                onClick={() => router.push("/initiatives")}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 px-6"
                              >
                                Browse Events
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        participations.map((participation) => (
                          <TableRow
                            key={participation.id}
                            className="hover:bg-blue-900 hover:bg-opacity-30 border-blue-300"
                          >
                            <TableCell className="font-medium text-lg py-6 text-white">
                              {participation.EventParticipated.eventName}
                            </TableCell>
                            <TableCell className="text-blue-100 text-base py-6">
                              {participation.TeamName || "Individual"}
                            </TableCell>
                            <TableCell className="text-blue-100 text-base py-6">
                              {participation.participants
                                .map((participant) => participant.userName)
                                .join(", ")}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;