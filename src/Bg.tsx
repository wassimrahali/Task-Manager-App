import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './Navbar';
import TaskManagerTable from './ReducerTaskManager';
import Footer from './Footer';

export default function Bg() {
  // Define the background image URL or path
  const backgroundImage = 'url(./assets/img.jpeg)'; // Replace with the correct path

  // Scroll-related hooks
  const { scrollYProgress } = useScroll(); // Tracks how far you've scrolled (0 - 1)
  
  // Map scroll progress to scale (between 1 and 1.2)
  const scale = useTransform(scrollYProgress, [1, 4], [1, 1.05]);

  // Map scroll progress to opacity (fades out slightly)
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <>
      <Navbar />

      <motion.section
        style={{
          backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale, // Animate scale based on scroll
          opacity, // Animate opacity based on scroll
        }}
        className="relative min-h-screen overflow-hidden bg-gray-950  text-gray-200"
      >
        {/* Main Content */}
        <div className="relative z-10 space-y-10 m-0 p-0">
        <TaskManagerTable />
          <Footer />

        </div>

        {/* Starfield Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas>
            <Stars radius={100} count={5500} factor={3} fade speed={4} />
          </Canvas>
        </div>

      </motion.section>

    </>
  );
}
