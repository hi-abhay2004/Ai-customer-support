import Head from 'next/head';
import Hero from '@/app/components/hero/page';
import Features from '@/app/components/features/page';
import HowItWorks from '@/app/components/howitworks/page';
import Reviews from '@/app/components/reviews/page';
import CallToAction from '@/app/components/calltoaction/page';
export default function Home() {
  return (
    <>
      <Head>
        <title>AI Customer Support</title>
        <meta name="description" content="24/7 AI-powered customer support for your business." />
      </Head>

      <main className="bg-white text-gray-800">
        {/* Hero Section */}
       <Hero/>

        {/* Features Section */}
       <Features/>

        {/* How It Works */}
       <HowItWorks/>

        {/* Testimonials */}
      <Reviews/>

        {/* Pricing */}
      

        {/* Final CTA */}
       <CallToAction/>

        {/* Footer */}
        <footer className="py-8 px-6 text-center bg-gray-900 text-white">
          <p>© {new Date().getFullYear()} AI Support Platform. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
