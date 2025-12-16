"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, CheckCircle, XCircle, Download, Award, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Mock Certificate Data Types
interface CertificateData {
  id: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  grade: string;
  instructor: string;
}

export default function CertificateVerifyPage() {
  const [certificateId, setCertificateId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "valid" | "invalid">("idle");
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);

  // Mock Verification Logic
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) return;

    setStatus("loading");
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Hardcoded mock valid ID for testing: "CERT-123"
    if (certificateId.toUpperCase() === "CERT-123") {
      setCertificateData({
        id: "CERT-123",
        studentName: "Alex Johnson",
        courseName: "Advanced React & Next.js Masterclass",
        issueDate: "December 15, 2024",
        grade: "A+",
        instructor: "Sarah Smith"
      });
      setStatus("valid");
      toast.success("Certificate Verified Successfully");
    } else {
      setCertificateData(null);
      setStatus("invalid");
      toast.error("Invalid Certificate ID");
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-20">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-block p-4 bg-primary border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full mb-6 animate-float">
          <Shield className="w-12 h-12 text-black" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight">
          Verify <span className="text-primary underline decoration-4 underline-offset-4">Certificate</span>
        </h1>
        <p className="text-xl font-bold text-gray-600">
          Enter the unique certificate ID to verify the authenticity of a student's completion.
        </p>
      </div>

      {/* Verification Form */}
      <div className="max-w-2xl mx-auto mb-20 relative z-10">
        <form onSubmit={handleVerify} className="relative">
          <div className="flex flex-col md:flex-row gap-4 p-2 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <Input 
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter Certificate ID (e.g., CERT-123)" 
                className="w-full h-14 pl-12 text-lg font-bold border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-300"
              />
            </div>
            <Button 
              type="submit" 
              disabled={status === "loading"}
              className="h-14 px-8 text-xl font-bold border-l-4 border-black rounded-none md:rounded-r-lg bg-primary hover:bg-primary/90 text-black transition-all hover:translate-x-1"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Now"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto">
        {status === "valid" && certificateData && (
          <div className="animate-fade-in-up">
            <div className="bg-[#FFF8DE] border-8 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-[100%] -mr-16 -mt-16 z-0" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-tr-[100%] -ml-16 -mb-16 z-0" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-400 rounded-full border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <CheckCircle className="w-10 h-10 text-black" />
                </div>
                
                <h2 className="text-3xl font-bold mb-2">Certificate Verified</h2>
                <p className="text-green-700 font-bold mb-8 bg-green-100 px-4 py-1 rounded-full border-2 border-green-700">
                  This certificate is valid and authentic
                </p>

                <div className="w-full grid md:grid-cols-2 gap-8 text-left bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] mb-8">
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase mb-1">Student</p>
                    <p className="text-2xl font-bold text-black">{certificateData.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase mb-1">Course</p>
                    <p className="text-2xl font-bold text-black">{certificateData.courseName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase mb-1">Issue Date</p>
                    <p className="text-xl font-bold text-black">{certificateData.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase mb-1">Certificate ID</p>
                    <p className="text-xl font-mono font-bold text-black bg-gray-100 inline-block px-2">{certificateData.id}</p>
                  </div>
                   <div>
                    <p className="text-sm font-bold text-gray-500 uppercase mb-1">Instructor</p>
                    <p className="text-xl font-bold text-black">{certificateData.instructor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase mb-1">Grade</p>
                    <p className="text-xl font-bold text-primary">{certificateData.grade}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all font-bold text-lg bg-white hover:bg-gray-50 text-black">
                     <Download className="w-5 h-5 mr-2" />
                     Download PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {status === "invalid" && (
           <div className="animate-shake">
            <div className="bg-red-50 border-4 border-red-500 p-8 text-center shadow-[8px_8px_0px_0px_#ef4444]">
              <div className="w-16 h-16 bg-red-100 rounded-full border-4 border-red-500 flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-red-900 mb-2">Verification Failed</h3>
              <p className="font-bold text-red-700">
                We could not find a certificate with that ID. Please check the ID and try again.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
