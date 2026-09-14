import React from 'react'
import TabSwitch from './BlogTab'
import Hero from './Hero'

const Blog = () => {
  return (
    <div className="w-full bg-[#faf9f6] text-gray-900 min-h-screen">
      <Hero />
      <TabSwitch />
    </div>
  );
};

export default Blog