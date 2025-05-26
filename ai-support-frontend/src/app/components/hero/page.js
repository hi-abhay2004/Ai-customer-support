// import { button } from "@/components/ui/button";
"use client"
import { ArrowRight } from "lucide-react";
import AuthModal from "../login/page";
import { useState } from "react";
const Hero = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
            {/* Background decoration */}
            <div
                className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] 
        opacity-40"
            ></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left animate-fade-in">
                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            Revolutionize Your{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Customer Support
                            </span>{" "}
                            with AI
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                            24/7 intelligent support, powered by cutting-edge AI. Transform customer
                            interactions with instant, accurate, and personalized responses.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">

                            <button
                            onClick={() => setModalOpen(true)}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                size="lg" // this prop will be ignored on native button
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>

                            <button
                                variant="outline"
                                size="lg"
                                className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                            >
                                Watch Demo
                            </button>
                            <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                        </div>
                        <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                No setup fees
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                14-day free trial
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Cancel anytime
                            </div>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="relative lg:block hidden">
                        <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl shadow-2xl overflow-hidden">
                            <div className="absolute inset-4 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                            <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Assistant</h3>
                                    <p className="text-gray-600">Always ready to help</p>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
