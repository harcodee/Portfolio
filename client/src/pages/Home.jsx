import { motion } from 'framer-motion';
import Hero             from '../components/Hero';
import TrustIndicators  from '../components/TrustIndicators';
import Patent           from '../components/Patent';
import Projects         from '../components/Projects';
import MoreWork         from '../components/MoreWork';
import Skills           from '../components/Skills';
import Resume           from '../components/Resume';
import Contact          from '../components/Contact';
import Footer           from '../components/Footer';

/*
  LAYOUT:
  1. Hero             -> Branding & tagline
  2. TrustIndicators  -> Verified metrics
  3. Patent           -> Intellectual property / Registered Software Innovator
  4. Projects         -> Case studies
  5. MoreWork         -> Supplementary projects
  6. Skills           -> Technical capabilities
  7. Resume           -> Career timeline
  8. Contact          -> Contact details
  9. Footer           -> Signature
*/

export default function Home() {
  return (
    <motion.div
      initial={false}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <main id="main-content">
        <Hero />
        <TrustIndicators />
        <Patent />
        <Projects />
        <MoreWork />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
}
