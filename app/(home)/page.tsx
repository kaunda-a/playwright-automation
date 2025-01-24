"use client";

import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

import { Hero } from '@/components/home/hero';
import { Feature } from '@/components/home/feature';
import { Banner } from '@/components/home/banner';

import  Client from '@/components/home/client';
import { Newsletter } from '@/components/home/newsletter';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <HashLoader size={50} color="#000000" />
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <Feature />
      <Banner />
      <Client />
      <Newsletter />
    </div>
  );
}

export default HomePage;
