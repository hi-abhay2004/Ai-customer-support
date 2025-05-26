const Features = () => {
    const features = [
      {
        title: "Instant Responses",
        description: "Get immediate answers to customer queries with our AI-powered response system that never sleeps.",
        icon: "⚡",
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        title: "Multilingual Support",
        description: "Communicate with customers in over 100 languages with real-time translation capabilities.",
        icon: "🌍",
        gradient: "from-purple-500 to-pink-500"
      },
      {
        title: "Human Handoff",
        description: "Seamlessly transfer complex queries to human agents when AI reaches its limits.",
        icon: "🤝",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        title: "Insightful Analytics",
        description: "Track performance metrics and gain valuable insights into customer behavior and satisfaction.",
        icon: "📊",
        gradient: "from-orange-500 to-red-500"
      }
    ];
  
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to deliver exceptional customer experiences, powered by artificial intelligence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
  