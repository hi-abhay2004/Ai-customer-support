// "use client"
// import { useState } from "react";
// import { auth } from "@/app/auth/firebase/page";
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
//   signInWithEmailAndPassword,
// } from "firebase/auth";

// import CompanyRegistrationModal from "../companyregestration/page";
// import { ArrowRight } from "lucide-react";
// import { useRouter } from "next/navigation"; // ✅ use this


// const AuthModal = ({ isOpen, onClose }) => {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [showCompanyRegister, setShowCompanyRegister] = useState(false);
    
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const resetForm = () => {
//     setEmail("");
//     setPassword("");
//     setName("");
//     setError("");
//     setLoading(false);
//   };

//   const switchToRegister = () => {
//     resetForm();
//     setIsRegistering(true);
//     setShowCompanyRegister(true); // open full company registration
//   };

//   const switchToLogin = () => {
//     resetForm();
//     setIsRegistering(false);
//     setShowCompanyRegister(false); // close company registration
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Show company registration only if user has no display name
//       if (!user.displayName) {
//         setShowCompanyRegister(true);
//       } else {
//         onClose();
//         router.push("/pages/dashboard");
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//     setLoading(false);
//   };

//   if (!isOpen && !showCompanyRegister) return null;

//   return (
//     <>
//       {/* Show Company Registration Modal */}
//       {showCompanyRegister ? (
//         <CompanyRegistrationModal
//           onClose={() => {
//             setShowCompanyRegister(false);
//             setIsRegistering(false);
//             onClose(); // close everything after registration
//             router.push("/pages/dashboard");
//           }}
//         />
//       ) : (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-lg relative">
//             <button
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
//               onClick={() => {
//                 resetForm();
//                 onClose();
//               }}
//               aria-label="Close modal"
//             >
//               ✕
//             </button>

//             <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Sign in to Your Account</h2>
//             {error && <p className="mb-4 text-red-600 text-center font-semibold">{error}</p>}

//             <form onSubmit={handleLogin} className="space-y-6">
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 required
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
//               >
//                 {loading ? "Signing in..." : "Sign In"}
//                 <ArrowRight className="h-5 w-5" />
//               </button>
//             </form>

//             <p className="mt-6 text-center text-gray-600">
//               Don't have an account?{" "}
//               <button
//                 onClick={switchToRegister}
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Register
//               </button>
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AuthModal;
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const BASE_URL = "http://34.131.200.150/support"; // Django backend IP

const AuthModal = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setName("");
    setDomain("");
    setCompanyEmail("");
    setBusinessType("");
    setError("");
    setLoading(false);
  };

  const switchToRegister = () => {
    resetForm();
    setIsRegistering(true);
  };

  const switchToLogin = () => {
    resetForm();
    setIsRegistering(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const registrationData = {
      username,
      password,
      name,
      domain,
      company_email: companyEmail,
      business_type: businessType,
    };

    try {
      console.log("🔁 Sending registration data:", registrationData);

      const registerRes = await axios.post(`${BASE_URL}/register/`, registrationData);
      console.log("✅ Register response:", registerRes.data);

      const loginData = { username, password };
      console.log("🔁 Sending login data:", loginData);

      const loginResponse = await axios.post(`${BASE_URL}/login/`, loginData);
      console.log("✅ Login after register response:", loginResponse.data);

      const { token } = loginResponse.data;
      localStorage.setItem("access_token", token);
      router.push("/pages/admin_dashboard");
      onClose();
      resetForm();
    } catch (err) {
      console.error("❌ Registration/Login error:", err);
      if (err.response) {
        console.error("❗ Backend response:", err.response.data);
      }
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        "Registration or login failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const loginData = { username, password };

    try {
      console.log("🔁 Sending login data:", loginData);
      const response = await axios.post(`${BASE_URL}/login/`, loginData);
      console.log("✅ Login response:", response.data);

      const { token } = response.data;
      localStorage.setItem("access_token", token);
      router.push("/pages/dashboard");
      onClose();
      resetForm();
    } catch (err) {
      console.error("❌ Login error:", err);
      if (err.response) {
        console.error("❗ Backend response:", err.response.data);
      }
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        "Invalid username or password.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={() => {
            resetForm();
            onClose();
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          {isRegistering ? "Create Your Account" : "Sign in to Your Account"}
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-center font-semibold">{error}</p>
        )}

        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="space-y-6"
        >
          {isRegistering && (
            <>
              <input
                type="text"
                placeholder="Company Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="text"
                placeholder="Company Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="email"
                placeholder="Company Email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Business Type"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </>
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            {loading ? (
              isRegistering ? "Registering..." : "Signing in..."
            ) : (
              <>
                {isRegistering ? "Register" : "Sign In"}
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <button
                onClick={switchToLogin}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={switchToRegister}
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
