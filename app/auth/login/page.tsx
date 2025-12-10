// app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Konfigurasi API
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1/auth/google-verify";

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError(null);

    const idToken = credentialResponse.credential;

    try {
      const response = await axios.post(API_URL, {
        token: idToken,
      });

      // Log untuk debugging (hapus di production)
      console.log("Login Google berhasil:", response.data.session);

      // Simpan session ke localStorage
      const { session } = response.data;
      if (session?.access_token) {
        localStorage.setItem("authToken", session.access_token);
        localStorage.setItem("userData", JSON.stringify(session.user));

        // Redirect ke dashboard
        router.push("/dashboard");
      } else {
        throw new Error("Token tidak ditemukan dalam response");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || "Gagal melakukan login. Silakan coba lagi.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Gagal login dengan Google. Silakan coba lagi.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="space-y-3 pb-6">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">QR</span>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Welcome Back</CardTitle>
            <CardDescription className="text-center text-gray-600">Sign in to access your dashboard</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="animate-in fade-in-50">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {/* Google Login Section */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Continue with</span>
              </div>
            </div>

            {/* Google Login Button */}
            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                {loading ? (
                  <Button disabled className="w-full">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </Button>
                ) : (
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} theme="filled_blue" size="large" shape="rectangular" text="signin_with" locale="id" />
                )}
              </div>
            </div>

            {/* Additional Info */}
            <p className="text-xs text-center text-gray-500 pt-4">
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Demo Note */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">Using demo account? Contact admin for credentials</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
