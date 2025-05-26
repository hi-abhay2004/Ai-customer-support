const HowItWorks = () => {
    const steps = [
      {
        step: "01",
        title: "Integrate",
        description: "Connect our AI platform to your existing systems with our simple API or widget integration.",
        color: "blue"
      },
      {
        step: "02", 
        title: "Automate",
        description: "Train the AI on your knowledge base and let it learn your business processes automatically.",
        color: "purple"
      },
      {
        step: "03",
        title: "Support Customers",
        description: "Watch as your AI assistant handles customer queries 24/7 with human-like understanding.",
        color: "green"
      }
    ];
  
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get up and running in minutes with our streamlined setup process.
            </p>
          </div>
  
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2"></div>
            
            <div className="grid lg:grid-cols-3 gap-12 relative">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${
                    step.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    step.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-green-500 to-green-600'
                  } flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  