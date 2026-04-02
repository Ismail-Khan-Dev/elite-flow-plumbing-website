import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Droplets, 
  Shield, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-navy-900/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <a href="#" className="font-display font-bold text-xl text-white">
            EliteFlow
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-sm text-foreground/80 hover:text-foreground transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('why-us')} className="text-sm text-foreground/80 hover:text-foreground transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollToSection('coverage')} className="text-sm text-foreground/80 hover:text-foreground transition-colors">
              Coverage
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm text-foreground/80 hover:text-foreground transition-colors">
              Contact
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn-primary text-sm">
              Book a Visit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-navy-900/98 backdrop-blur-lg lg:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <button onClick={() => scrollToSection('services')} className="text-2xl font-display text-white">Services</button>
            <button onClick={() => scrollToSection('why-us')} className="text-2xl font-display text-white">How It Works</button>
            <button onClick={() => scrollToSection('coverage')} className="text-2xl font-display text-white">Coverage</button>
            <button onClick={() => scrollToSection('contact')} className="text-2xl font-display text-white">Contact</button>
            <button onClick={() => scrollToSection('contact')} className="btn-primary mt-4">Book a Visit</button>
          </div>
        </div>
      )}
    </>
  );
}

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const text = textRef.current;
    if (!section || !leftPanel || !rightPanel || !text) return;

    const ctx = gsap.context(() => {
      // Entrance animation (on load)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo(leftPanel, 
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 }
      )
      .fromTo(rightPanel,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        0.08
      )
      .fromTo(text.querySelectorAll('.animate-item'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 },
        0.4
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([leftPanel, rightPanel], { x: 0, opacity: 1 });
            gsap.set(text.querySelectorAll('.animate-item'), { y: 0, opacity: 1 });
          }
        }
      });

      // Exit phase (70% - 100%)
      scrollTl.fromTo(leftPanel,
        { x: 0, opacity: 1 },
        { x: '-35vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(rightPanel,
        { x: 0, opacity: 1 },
        { x: '35vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(text.querySelectorAll('.animate-item'),
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-navy-900 z-10">
      {/* Left Panel */}
      <div 
        ref={leftPanelRef}
        className="absolute left-0 top-0 w-1/2 h-full"
      >
        <img 
          src="/hero_bathroom_sink.jpg" 
          alt="Modern bathroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-900/30" />
      </div>

      {/* Right Panel */}
      <div 
        ref={rightPanelRef}
        className="absolute right-0 top-0 w-1/2 h-full"
      >
        <img 
          src="/hero_plumber_hands.jpg" 
          alt="Professional plumbing" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-navy-900/30" />
      </div>

      {/* Center gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-transparent to-navy-900/60" />

      {/* Text Content */}
      <div 
        ref={textRef}
        className="absolute right-[6vw] top-1/2 -translate-y-1/2 w-[40vw] max-w-xl text-left"
      >
        <span className="animate-item micro-label text-cyan mb-4 block">
          ELITEFLOW PLUMBING
        </span>
        <h1 className="animate-item headline-xl text-white mb-6 accent-underline">
          Plumbing. Built for modern living.
        </h1>
        <p className="animate-item text-lg text-foreground/80 mb-8 leading-relaxed">
          Clean installs, smart monitoring, and 24/7 emergency care—without the mess.
        </p>
        <div className="animate-item flex flex-wrap gap-4">
          <a href="#contact" className="btn-primary">
            Book a Visit
            <ArrowRight size={18} />
          </a>
          <a href="#coverage" className="text-link">
            See Coverage
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

// Feature Section Component (reusable for pinned sections)
interface FeatureSectionProps {
  id?: string;
  image: string;
  microLabel: string;
  headline: string;
  body: string;
  cta: string;
  cardPosition: 'left' | 'right';
  zIndex: number;
}

function FeatureSection({ id, image, microLabel, headline, body, cta, cardPosition, zIndex }: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const card = cardRef.current;
    if (!section || !bg || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Entrance (0% - 30%)
      scrollTl.fromTo(bg,
        { scale: 1.12, opacity: 0.6 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(card,
        { x: cardPosition === 'left' ? '-60vw' : '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Card content stagger
      const cardContent = card.querySelectorAll('.card-animate');
      scrollTl.fromTo(cardContent,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
        0.08
      );

      // Settle (30% - 70%) - hold position

      // Exit (70% - 100%)
      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: cardPosition === 'left' ? '-40vw' : '40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(bg,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.35, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, [cardPosition]);

  return (
    <section ref={sectionRef} id={id} className="section-pinned" style={{ zIndex }}>
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0">
        <img src={image} alt={headline} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-navy-900/40" />
      </div>

      {/* Floating Card */}
      <div 
        ref={cardRef}
        className={`absolute ${cardPosition === 'left' ? 'left-[6vw]' : 'right-[6vw]'} bottom-[10vh] w-[42vw] max-w-xl glass-card p-8 lg:p-10`}
      >
        <span className="card-animate micro-label text-cyan mb-4 block">{microLabel}</span>
        <h2 className="card-animate headline-lg text-white mb-4 accent-underline">{headline}</h2>
        <p className="card-animate text-foreground/80 mb-6 leading-relaxed">{body}</p>
        <a href="#contact" className="card-animate text-link">
          {cta}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(heading.querySelectorAll('.heading-animate'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: heading,
            start: 'top 75%',
            end: 'top 55%',
            scrub: 0.4,
          }
        }
      );

      // Cards reveal
      const cardElements = cards.querySelectorAll('.value-card');
      cardElements.forEach((card) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 55%',
              scrub: 0.4,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: CheckCircle2,
      title: 'Upfront Pricing',
      description: 'No hidden fees. You approve everything before we start.',
    },
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Full coverage, code-compliant work, and clear documentation.',
    },
    {
      icon: Clock,
      title: 'Same-Week Scheduling',
      description: 'Book online. We show up on time, every time.',
    },
    {
      icon: Droplets,
      title: 'Smart Reports',
      description: 'Photo updates, pressure charts, and maintenance reminders.',
    },
  ];

  return (
    <section ref={sectionRef} id="why-us" className="relative bg-navy-800 py-24 lg:py-32 z-[60]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="heading-animate headline-lg text-white mb-4">Built different. Built better.</h2>
          <p className="heading-animate text-foreground/70 text-lg max-w-2xl mx-auto">
            We combine old-school craftsmanship with modern tech—so your plumbing stays invisible, reliable, and efficient.
          </p>
        </div>

        {/* Value Cards */}
        <div ref={cardsRef} className="space-y-6">
          {values.map((value, index) => (
            <div key={index} className="value-card flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center">
                <value.icon className="text-cyan" size={24} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white text-lg mb-1">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(left,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          }
        }
      );

      gsap.fromTo(right,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 35%',
            scrub: 0.4,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative bg-navy-900 py-24 lg:py-32 z-[70]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Form */}
          <div ref={leftRef}>
            <h2 className="headline-lg text-white mb-4">Ready when you are.</h2>
            <p className="text-foreground/70 mb-8">
              Tell us what you need. We'll confirm your appointment and arrival window within minutes.
            </p>

            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input type="text" placeholder="Name" className="form-input" />
                <input type="tel" placeholder="Phone" className="form-input" />
              </div>
              <select className="form-input">
                <option value="">Select Service Type</option>
                <option value="repair">Repair</option>
                <option value="installation">Installation</option>
                <option value="maintenance">Maintenance</option>
                <option value="emergency">Emergency</option>
              </select>
              <textarea placeholder="Message" rows={4} className="form-input resize-none" />
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Request Appointment
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Right Column - Contact Info */}
          <div ref={rightRef} className="lg:pl-8">
            <div className="glass-card p-8 mb-8">
              <h3 className="font-display font-semibold text-white text-lg mb-6">Contact Information</h3>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                    <Phone className="text-cyan" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Phone</p>
                    <p className="text-white font-medium">(555) 014-2200</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                    <Mail className="text-cyan" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Email</p>
                    <p className="text-white font-medium">hello@eliteflow.plumbing</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                    <MapPin className="text-cyan" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Address</p>
                    <p className="text-white font-medium">1200 Industrial Blvd, Suite 400</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="font-display font-semibold text-white text-lg mb-4">Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Monday - Friday</span>
                  <span className="text-white">7:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Saturday</span>
                  <span className="text-white">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Sunday</span>
                  <span className="text-white">Emergency Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative bg-navy-900 py-12 z-[70] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xl text-white">EliteFlow</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#services" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Services</a>
            <a href="#coverage" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Coverage</a>
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Terms</a>
          </div>

          <p className="text-sm text-foreground/40">
            © EliteFlow Plumbing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  useEffect(() => {
    // Global scroll snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-navy-900">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Feature Sections */}
        <FeatureSection
          id="services"
          image="/feature_fittings.jpg"
          microLabel="CRAFT"
          headline="Precision fittings. Zero leaks."
          body="We map pressure, thread count, and thermal expansion—so every joint stays sealed for decades."
          cta="Explore Materials"
          cardPosition="left"
          zIndex={20}
        />

        <FeatureSection
          image="/feature_smart_manifold.jpg"
          microLabel="TECHNOLOGY"
          headline="Smart water. Real-time control."
          body="Monitor flow, pressure, and temperature from your phone. Catch leaks before they become floods."
          cta="See How It Works"
          cardPosition="right"
          zIndex={30}
        />

        <FeatureSection
          image="/feature_leak.jpg"
          microLabel="DETECTION"
          headline="Catch the drip. Prevent the damage."
          body="Acoustic sensors and pressure mapping detect anomalies early—so you fix a drip, not a ceiling."
          cta="View Diagnostics"
          cardPosition="left"
          zIndex={40}
        />

        <FeatureSection
          id="coverage"
          image="/feature_vanity.jpg"
          microLabel="COVERAGE"
          headline="Every fixture. One system."
          body="From shut-off valves to vent stacks, we design, install, and maintain the full loop—quiet, efficient, and clean."
          cta="Browse Services"
          cardPosition="right"
          zIndex={50}
        />

        <FeatureSection
          image="/feature_black_faucet.jpg"
          microLabel="INSTALLATION"
          headline="Installs that look as good as they run."
          body="Minimalist fixtures, hidden lines, and perfect water delivery—designed around your space."
          cta="See Styles"
          cardPosition="left"
          zIndex={55}
        />

        <FeatureSection
          image="/feature_phone_app.jpg"
          microLabel="CONNECTED"
          headline="Your water. In your pocket."
          body="Get alerts for unusual usage, track consumption, and shut off the main line remotely—anytime."
          cta="Explore the App"
          cardPosition="right"
          zIndex={58}
        />

        <FeatureSection
          image="/feature_maintenance.jpg"
          microLabel="MAINTENANCE"
          headline="Maintenance that prevents midnight surprises."
          body="Annual inspections, drain cleaning, and pressure balancing—scheduled around your calendar."
          cta="Set a Schedule"
          cardPosition="left"
          zIndex={59}
        />

        <FeatureSection
          image="/feature_emergency.jpg"
          microLabel="EMERGENCY"
          headline="Emergency care. Calm hands."
          body="Burst pipe? Sewer backup? We're on call with clear pricing, fast arrival, and a plan—no panic."
          cta="Call 24/7"
          cardPosition="right"
          zIndex={60}
        />

        <FeatureSection
          image="/feature_sustainability.jpg"
          microLabel="SUSTAINABILITY"
          headline="Use less. Perform better."
          body="Low-flow fixtures, smart scheduling, and leak prevention that cuts waste—and utility bills."
          cta="Go Efficient"
          cardPosition="left"
          zIndex={65}
        />

        {/* Why Choose Us */}
        <WhyChooseUsSection />

        {/* Contact */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
