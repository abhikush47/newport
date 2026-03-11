import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import  {ArchitectureFlow}  from './components/ArchitectureFlow';
import { ComposeSection } from './components/ComposeSection';
import { ProjectShowcase } from './components/ProjectShowcase';
import { WhatIShipSection } from './components/WhatIShipSection';
import { TechStack } from './components/TechStack';
import { ContactSection } from './components/ContactSection';
import { BlogSection } from "./components/BlogSection";

function App() {
  return (
    <Layout>
      <Hero />
      <ArchitectureFlow />
      <ComposeSection />
      <ProjectShowcase />
      <BlogSection />
      <WhatIShipSection />
      <TechStack />
      <ContactSection />
    </Layout>
  );
}

export default App;
