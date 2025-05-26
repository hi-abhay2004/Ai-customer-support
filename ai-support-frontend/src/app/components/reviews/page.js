const Reviews = () => {
    const testimonials = [
      {
        quote: "This AI platform transformed our customer support. Response times dropped from hours to seconds, and customer satisfaction increased by 40%.",
        author: "Sarah Chen",
        position: "Head of Customer Success",
        company: "TechFlow Inc.",
        avatar: "SC"
      },
      {
        quote: "The multilingual support feature has been a game-changer for our global business. We can now serve customers in their native language effortlessly.",
        author: "Marcus Rodriguez",
        position: "Operations Director", 
        company: "GlobalCart",
        avatar: "MR"
      },
      {
        quote: "The seamless handoff to human agents when needed is brilliant. Our team can focus on complex issues while AI handles routine queries.",
        author: "Emily Watson",
        position: "Customer Experience Manager",
        company: "ServicePro",
        avatar: "EW"
      }
    ];
  
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of companies that have revolutionized their customer support with our AI platform.
            </p>
          </div>
  
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Reviews;
  