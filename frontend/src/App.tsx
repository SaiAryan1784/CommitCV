import React from 'react';
import { ArrowRight, Code, Layout, Zap } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Icon className="w-8 h-8 text-indigo-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-24" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072)'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Welcome to Our Platform
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              Build something amazing with React and Tailwind CSS. Fast, responsive, and beautiful.
            </p>
            <div className="mt-10">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Get Started
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Powerful Features
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to build amazing projects
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Built with performance in mind, ensuring your application runs smoothly."
            />
            <FeatureCard
              icon={Layout}
              title="Responsive Design"
              description="Looks great on any device with a mobile-first approach."
            />
            <FeatureCard
              icon={Code}
              title="Modern Stack"
              description="Using the latest technologies like React and Tailwind CSS."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;