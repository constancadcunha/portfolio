import Hero from './components/Hero';
import CoreFeatures from './components/CoreFeatures';
import AnalyticsFeatures from './components/AnalyticsFeatures';
import IntegrationFeatures from './components/IntegrationFeatures';
import SecurityFeatures from './components/SecurityFeatures';
import CTA from './components/CTA';
import PageNavbar from '../../components/feature/PageNavbar';
import Footer from '../home/components/Footer';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageNavbar />
      <Hero />
      <CoreFeatures />
      <AnalyticsFeatures />
      <IntegrationFeatures />
      <SecurityFeatures />
      <CTA />
      <Footer />
    </div>
  );
}
