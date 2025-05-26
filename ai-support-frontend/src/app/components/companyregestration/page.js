import { useState } from "react";
import { X } from "lucide-react";
import { registerUser } from "../../lib/api";

const CompanyRegistrationModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationName: "",
    companyEmail: "",
    businessType: "",
    website: "",
    registrationNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    fullName: "",
    username: "",
    contactEmail: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Call Django backend registration
      await registerUser({
        username: formData.username,
        password: formData.password,
        name: formData.organizationName,
        domain: formData.website, // or another field for domain
        company_email: formData.companyEmail,
        business_type: formData.businessType
      });
      alert("Company registered successfully!");
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Company Registration <br/> Step {step} of 3
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <input name="organizationName" onChange={handleChange} required placeholder="Organization Name" className="w-full p-3 border rounded-xl" />
              <input name="companyEmail" onChange={handleChange} required placeholder="Company Email" type="email" className="w-full p-3 border rounded-xl" />
              <input name="businessType" onChange={handleChange} required placeholder="Business Type / Industry" className="w-full p-3 border rounded-xl" />
              <input name="website" onChange={handleChange} placeholder="Website (optional)" className="w-full p-3 border rounded-xl" />
              <input name="registrationNumber" onChange={handleChange} placeholder="Registration Number / GSTIN" className="w-full p-3 border rounded-xl" />
            </>
          )}

          {step === 2 && (
            <>
              <input name="address1" onChange={handleChange} required placeholder="Address Line 1" className="w-full p-3 border rounded-xl" />
              <input name="address2" onChange={handleChange} placeholder="Address Line 2" className="w-full p-3 border rounded-xl" />
              <input name="city" onChange={handleChange} required placeholder="City" className="w-full p-3 border rounded-xl" />
              <input name="state" onChange={handleChange} required placeholder="State" className="w-full p-3 border rounded-xl" />
              <input name="zip" onChange={handleChange} required placeholder="ZIP / Postal Code" className="w-full p-3 border rounded-xl" />
              <input name="country" onChange={handleChange} required placeholder="Country" className="w-full p-3 border rounded-xl" />
            </>
          )}

          {step === 3 && (
            <>
              <input name="fullName" onChange={handleChange} required placeholder="Full Name" className="w-full p-3 border rounded-xl" />
              <input name="username" onChange={handleChange} required placeholder="Username" className="w-full p-3 border rounded-xl" />
              <input name="contactEmail" onChange={handleChange} required type="email" placeholder="Email Address" className="w-full p-3 border rounded-xl" />
              <input name="phone" onChange={handleChange} required placeholder="Phone Number" className="w-full p-3 border rounded-xl" />
              <input name="password" onChange={handleChange} required type="password" placeholder="Password" className="w-full p-3 border rounded-xl" />
              <input name="confirmPassword" onChange={handleChange} required type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-xl" />
            </>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistrationModal;
