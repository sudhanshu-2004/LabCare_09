import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone, MessageCircle, CheckCircle, XCircle,
  Droplets, Shield, FlaskConical, Trash2,
  Building2, Stethoscope, TestTubes, Truck,
  Award, Clock, DollarSign, HeadphonesIcon,
  Send, ArrowRight, Menu, X, MapPin
} from
  'lucide-react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

// Use relative URL on production (Vercel), localhost for dev
const API = process.env.NODE_ENV === 'production' ? '/api' : 'http://127.0.0.1:8000/api';

// Image URLs from design guidelines
const IMAGES = {
  logo: "https://customer-assets.emergentagent.com/job_9a511d01-0e26-4dfd-80c3-cc2760a83d5c/artifacts/xuu5huk8_IMG_20260202_235224_452.jpg",
  hero: "https://customer-assets.emergentagent.com/job_9a511d01-0e26-4dfd-80c3-cc2760a83d5c/artifacts/h3wy7hof_IMG_20260203_000529_298.jpg",
  products1: "https://customer-assets.emergentagent.com/job_9a511d01-0e26-4dfd-80c3-cc2760a83d5c/artifacts/ek1rjy04_file_00000000a77871fa8a06abb8c207020b.png",
  products2: "https://customer-assets.emergentagent.com/job_9a511d01-0e26-4dfd-80c3-cc2760a83d5c/artifacts/rnxgrrtq_IMG_20260204_182921_254.jpg",
  samples: "https://customer-assets.emergentagent.com/job_9a511d01-0e26-4dfd-80c3-cc2760a83d5c/artifacts/2lxrur72_lab_samples12822469_M.jpg",
  doctor: "https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxzbWlsaW5nJTIwZG9jdG9yJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzcyNTQyNjAxfDA&ixlib=rb-4.1.0&q=85",
  hospital: "https://images.unsplash.com/photo-1758653500534-a47f6cd8abb0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwzfHxjbGVhbiUyMGhvc3BpdGFsJTIwY29ycmlkb3J8ZW58MHx8fHwxNzcyNTQyNjAyfDA&ixlib=rb-4.1.0&q=85",
  truck: "https://images.unsplash.com/photo-1681514583213-7b8e47eb1953?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHxkZWxpdmVyeSUyMHRydWNrJTIwbG9naXN0aWNzJTIwbWVkaWNhbHxlbnwwfHx8fDE3NzI1NDI1ODd8MA&ixlib=rb-4.1.0&q=85"
};

const PHONE_NUMBER = "9625976683";
const WHATSAPP_LINK = `https://wa.me/91${PHONE_NUMBER}?text=Hi, I'm interested in Labcare Instruments products.`;

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Header Component
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md header-shadow">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 sm:gap-3" data-testid="header-logo">
            <img src={IMAGES.logo} alt="Labcare Instruments" className="h-10 md:h-14 w-auto" />
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1e3a5f] leading-tight">Labcare</h1>
              <p className="text-[10px] sm:text-xs md:text-sm text-[#0891b2] font-medium">At the Core of Every Lab</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('products')} className="text-[#475569] hover:text-[#1e3a5f] font-medium transition-colors" data-testid="nav-products">Products</button>
            <button onClick={() => scrollToSection('why-us')} className="text-[#475569] hover:text-[#1e3a5f] font-medium transition-colors" data-testid="nav-why-us">Why Us</button>
            <button onClick={() => scrollToSection('services')} className="text-[#475569] hover:text-[#1e3a5f] font-medium transition-colors" data-testid="nav-services">Services</button>
            <button onClick={() => scrollToSection('contact')} className="text-[#475569] hover:text-[#1e3a5f] font-medium transition-colors" data-testid="nav-contact">Contact</button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href={`tel:+91${PHONE_NUMBER}`} className="flex items-center gap-2 text-[#1e3a5f] font-semibold" data-testid="header-phone">
              <Phone size={18} />
              +91 {PHONE_NUMBER}
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#1e3a5f] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#162c4a] transition-all shadow-lg hover:shadow-xl"
              data-testid="header-cta">

              Get In Touch
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn">

            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden py-4 border-t">

            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('products')} className="text-[#475569] hover:text-[#1e3a5f] font-medium py-2 text-left">Products</button>
              <button onClick={() => scrollToSection('why-us')} className="text-[#475569] hover:text-[#1e3a5f] font-medium py-2 text-left">Why Us</button>
              <button onClick={() => scrollToSection('services')} className="text-[#475569] hover:text-[#1e3a5f] font-medium py-2 text-left">Services</button>
              <button onClick={() => scrollToSection('contact')} className="text-[#475569] hover:text-[#1e3a5f] font-medium py-2 text-left">Contact</button>
              <a href={`tel:+91${PHONE_NUMBER}`} className="flex items-center gap-2 text-[#1e3a5f] font-semibold py-2">
                <Phone size={18} />
                +91 {PHONE_NUMBER}
              </a>
            </nav>
          </motion.div>
        }
      </div>
    </header>);

};

// Hero Section
const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-slate-50 to-slate-100" data-testid="hero-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>

            <span className="inline-block bg-[#0891b2]/10 text-[#0891b2] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              100% Medical-Grade Disposable Products
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              The Trusted <span className="gradient-text !text-right">Disposable Lab</span> Solution
            </h1>
            <p className="text-lg md:text-xl text-[#475569] leading-relaxed mb-8 max-w-xl">
              Looking for high-quality disposable products for your pathology lab? We offer reliable supply, hygienic packaging, and the best market prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToContact}
                className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-semibold"
                data-testid="hero-cta-primary">

                Get In Touch Now
                <ArrowRight size={20} />
              </button>
              <button
                onClick={scrollToContact}
                className="bg-white text-[#1e3a5f] border-2 border-[#1e3a5f] px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-50 transition-all"
                data-testid="hero-cta-secondary">

                Free Lab Consultation
              </button>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-[#10b981]" size={20} />
                <span className="text-[#475569] font-medium">Reliable Supply</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-[#10b981]" size={20} />
                <span className="text-[#475569] font-medium">Hygienic Packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-[#10b981]" size={20} />
                <span className="text-[#475569] font-medium">Best Price</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={IMAGES.hero}
                alt="Labcare Instruments - Laboratory Equipment"
                className="w-full h-auto object-cover" />

            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}>

              <div className="bg-[#10b981]/10 p-3 rounded-xl">
                <Award className="text-[#10b981]" size={28} />
              </div>
              <div>
                <p className="text-[#0f172a] font-bold">Premium Quality</p>
                <p className="text-[#475569] text-sm">ISO Certified Products</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>);

};

// Products Section
const ProductsSection = () => {
  const products = [
    {
      title: "Blood Collection Range",
      icon: <Droplets size={32} />,
      items: ["Blood Collection Tubes", "EDTA / Plain / Fluoride Tubes", "Vacutainers", "Syringes & Needles"],
      image: IMAGES.samples,
      color: "from-red-500/10 to-red-500/5"
    },
    {
      title: "Safety & Hygiene",
      icon: <Shield size={32} />,
      items: ["Disposable Gloves", "Face Masks", "Alcohol Swabs"],
      image: IMAGES.products2,
      color: "from-blue-500/10 to-blue-500/5"
    },
    {
      title: "Testing & Sample Handling",
      icon: <FlaskConical size={32} />,
      items: ["Micropipette Tips", "Glass Slides & Cover Slips", "Test Tubes", "Centrifuge Tubes"],
      image: IMAGES.products1,
      color: "from-teal-500/10 to-teal-500/5"
    },
    {
      title: "Sample & Waste Management",
      icon: <Trash2 size={32} />,
      items: ["Urine Containers", "Specimen Containers", "Biohazard Bags", "Sharps Disposal Containers"],
      image: IMAGES.products1,
      color: "from-amber-500/10 to-amber-500/5"
    }];


  return (
    <section id="products" className="section-padding bg-white" data-testid="products-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <span className="text-[#0891b2] font-semibold tracking-wide uppercase text-sm">Our Products</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3">Disposable Products Range</h2>
          <p className="text-[#475569] mt-4 max-w-2xl mx-auto text-lg">
            Complete range of medical-grade disposable products for pathology labs and healthcare facilities
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}>

          {products.map((product, index) =>
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden card-hover"
              data-testid={`product-card-${index}`}>

              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-[#1e3a5f]/5 p-4 rounded-2xl text-[#1e3a5f] group-hover:bg-[#1e3a5f] group-hover:text-white transition-all">
                    {product.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0f172a] mb-4">{product.title}</h3>
                    <ul className="space-y-2">
                      {product.items.map((item, i) =>
                        <li key={i} className="flex items-center gap-2 text-[#475569]">
                          <CheckCircle size={16} className="text-[#10b981] flex-shrink-0" />
                          {item}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Product Images */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={IMAGES.samples} alt="Blood Collection Samples" className="w-full h-64 object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={IMAGES.products1} alt="Disposable Lab Products" className="w-full h-64 object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={IMAGES.products2} alt="Lab Equipment" className="w-full h-64 object-cover" />
          </div>
        </motion.div>
      </div>
    </section>);

};

// Why Choose Us Section
const WhyChooseSection = () => {
  const features = [
    { icon: <Award size={32} />, title: "High Quality", desc: "Medical-Grade Material" },
    { icon: <TestTubes size={32} />, title: "Accurate Testing", desc: "Safe Testing Support" },
    { icon: <Shield size={32} />, title: "Durable Packaging", desc: "Hygienic & Secure" },
    { icon: <DollarSign size={32} />, title: "Best Price", desc: "Competitive Market Rate" }];


  return (
    <section id="why-us" className="section-padding bg-pattern bg-slate-50" data-testid="why-us-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <span className="text-[#0891b2] font-semibold tracking-wide uppercase text-sm">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3">Why Choose Labcare Instruments?</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}>

          {features.map((feature, index) =>
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-lg transition-all card-hover"
              data-testid={`feature-card-${index}`}>

              <div className="inline-flex bg-[#0891b2]/10 p-4 rounded-2xl text-[#0891b2] mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">{feature.title}</h3>
              <p className="text-[#475569]">{feature.desc}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Additional benefits */}
        <motion.div
          className="mt-12 bg-white rounded-2xl p-8 md:p-12 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Wholesale & Retail Available</h3>
              <ul className="space-y-4">
                {["High Quality Medical-Grade Material", "Accurate & Safe Testing Support", "Durable Packaging", "Best Competitive Price in Market"].map((item, i) =>
                  <li key={i} className="flex items-center gap-3 text-[#475569]">
                    <div className="bg-[#10b981]/10 p-1 rounded-full">
                      <CheckCircle size={16} className="text-[#10b981]" />
                    </div>
                    {item}
                  </li>
                )}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src={IMAGES.doctor} alt="Medical Professional" className="w-full h-80 object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

// Comparison Section
const ComparisonSection = () => {
  const problems = [
    "Infection risk",
    "Sample contamination",
    "Inaccurate test results",
    "Frequent stock issues"];


  const solutions = [
    "Safe sample handling",
    "Hygienic workflow",
    "Accurate diagnostics",
    "Smooth lab operations"];


  return (
    <section className="section-padding bg-white" data-testid="comparison-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <span className="text-[#0891b2] font-semibold tracking-wide uppercase text-sm">Problem & Solution</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3">Before vs After</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Problems */}
          <motion.div
            className="bg-red-50 rounded-2xl p-8 comparison-bad"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            data-testid="comparison-problems">

            <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
              <XCircle className="text-red-500" />
              Without Quality Disposables
            </h3>
            <ul className="space-y-4">
              {problems.map((item, i) =>
                <li key={i} className="flex items-center gap-3 text-red-700">
                  <XCircle size={18} className="text-red-400 flex-shrink-0" />
                  {item}
                </li>
              )}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            className="bg-green-50 rounded-2xl p-8 comparison-good"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            data-testid="comparison-solutions">

            <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              With Labcare Products
            </h3>
            <ul className="space-y-4">
              {solutions.map((item, i) =>
                <li key={i} className="flex items-center gap-3 text-green-700">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  {item}
                </li>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>);

};

// Who We Serve Section
const ServicesSection = () => {
  const clients = [
    { icon: <FlaskConical size={40} />, title: "Pathology Labs" },
    { icon: <Building2 size={40} />, title: "Hospitals" },
    { icon: <Stethoscope size={40} />, title: "Clinics" },
    { icon: <TestTubes size={40} />, title: "Diagnostic Centers" },
    { icon: <Truck size={40} />, title: "Medical Distributors" }];


  return (
    <section id="services" className="section-padding bg-[#1e3a5f]" data-testid="services-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <span className="text-[#0891b2] font-semibold tracking-wide uppercase text-sm">Our Clients</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Who We Serve</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}>

          {clients.map((client, index) =>
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white hover:bg-white/20 transition-all"
              data-testid={`client-card-${index}`}>

              <div className="inline-flex text-[#0891b2] mb-4">
                {client.icon}
              </div>
              <h3 className="font-semibold">{client.title}</h3>
            </motion.div>
          )}
        </motion.div>

        {/* Hospital image */}
        <motion.div
          className="mt-16 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <img src={IMAGES.hospital} alt="Hospital Corridor" className="w-full h-64 md:h-80 object-cover" />
        </motion.div>
      </div>
    </section>);

};

// Ordering Process Section
const OrderingSection = () => {
  const steps = [
    { number: "1", title: "Click Get Best Price", desc: "Start your order" },
    { number: "2", title: "Share Your Details", desc: "Name & Mobile Number" },
    { number: "3", title: "Expert Callback", desc: "Our senior lab expert calls you" },
    { number: "4", title: "Confirm Order", desc: "Finalize quantity & pricing" },
    { number: "5", title: "Fast Delivery", desc: "Quick doorstep delivery" }];


  return (
    <section className="section-padding bg-slate-50" data-testid="ordering-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <span className="text-[#0891b2] font-semibold tracking-wide uppercase text-sm">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3">Easy Ordering Process</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}>

          {steps.map((step, index) =>
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative text-center"
              data-testid={`step-${index}`}>

              {/* Connector line */}
              {index < steps.length - 1 &&
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-[#0891b2]/30" />
              }
              <div className="relative">
                <div className="step-number inline-flex w-16 h-16 rounded-full items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                  {step.number}
                </div>
                <h3 className="font-bold text-[#0f172a] mb-2">{step.title}</h3>
                <p className="text-[#475569] text-sm">{step.desc}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Delivery image */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={IMAGES.truck} alt="Fast Delivery" className="w-full h-64 object-cover" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Fast & Reliable Delivery</h3>
            <p className="text-[#475569] mb-6">We ensure timely delivery of all your lab supplies with proper handling and hygienic packaging.</p>
            <ul className="space-y-3">
              {["Pan-India delivery available", "Bulk order support", "Track your shipment"].map((item, i) =>
                <li key={i} className="flex items-center gap-2 text-[#475569]">
                  <CheckCircle size={18} className="text-[#10b981]" />
                  {item}
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>);

};

// Special Offer Section
const OfferSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#1e3a5f] to-[#2d5283]" data-testid="offer-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}>

          <span className="inline-block bg-[#0891b2] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Special Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">FREE Lab Product Consultation</h2>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {["Bulk Order Support", "Best Price Assurance", "Fast Response Team"].map((item, i) =>
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="text-[#10b981]" size={20} />
                <span>{item}</span>
              </div>
            )}
          </div>
          <button
            onClick={scrollToContact}
            className="bg-white text-[#1e3a5f] px-10 py-4 rounded-full text-lg font-bold hover:bg-slate-100 transition-all shadow-xl inline-flex items-center gap-2"
            data-testid="offer-cta">

            Fill Your Details Now
            <ArrowRight size={20} />
          </button>
          <p className="text-white/80 mt-4 text-sm">Our senior expert will contact you shortly</p>
        </motion.div>
      </div>
    </section>);

};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error('Please fill in your name and phone number');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/leads`, {
        name: formData.name,
        phone: formData.phone,
        inquiry_type: 'contact_form'
      });
      toast.success('Thank you! Our expert will contact you shortly.');
      setFormData({ name: '', phone: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white" data-testid="contact-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>

            <span className="text-[#0891b2] font-semibold tracking-wide uppercase text-sm">Contact Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mt-3 mb-6">Get In Touch</h2>
            <p className="text-[#475569] text-lg mb-8">
              Fill your details and our senior lab expert will contact you with the best pricing for your requirements.
            </p>

            <div className="space-y-6">
              <a href={`tel:+91${PHONE_NUMBER}`} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors" data-testid="contact-phone">
                <div className="bg-[#1e3a5f] p-3 rounded-full text-white">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[#475569] text-sm">Call Now</p>
                  <p className="text-[#0f172a] font-bold text-lg">+91 {PHONE_NUMBER}</p>
                </div>
              </a>

              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors" data-testid="contact-whatsapp">
                <div className="bg-[#25d366] p-3 rounded-full text-white">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-[#475569] text-sm">WhatsApp</p>
                  <p className="text-[#0f172a] font-bold text-lg">Quick Response</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="bg-[#0891b2] p-3 rounded-full text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[#475569] text-sm">Address</p>
                  <p className="text-[#0f172a] font-bold">New Delhi</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="bg-[#0891b2] p-3 rounded-full text-white">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[#475569] text-sm">Business Hours</p>
                  <p className="text-[#0f172a] font-bold">Mon - Sat: 9AM - 7PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>

            <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl p-8" data-testid="contact-form">
              <h3 className="text-xl font-bold text-[#0f172a] mb-6">Request a Callback</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#475569] mb-2 font-medium">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0891b2] focus:border-transparent bg-white"
                    required
                    data-testid="form-name" />

                </div>

                <div>
                  <label className="block text-[#475569] mb-2 font-medium">Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0891b2] focus:border-transparent bg-white"
                    required
                    data-testid="form-phone" />

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                  data-testid="form-submit">

                  {loading ?
                    'Submitting...' :

                    <>
                      <Send size={20} />
                      Get In Touch
                    </>
                  }
                </button>
              </div>

              <p className="text-center text-[#475569] text-sm mt-4">
                Quick response guaranteed within 1 hour
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>);

};

// Footer Section
const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white py-12" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img src={IMAGES.logo} alt="Labcare Instruments" className="h-16 w-auto mb-4 bg-white rounded-lg p-2" />
            <p className="text-slate-400">At the Core of Every Lab</p>
            <p className="text-slate-400 mt-2">Premium quality disposable lab products at the best market price.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:+91${PHONE_NUMBER}`} className="hover:text-white transition-colors">+91 {PHONE_NUMBER}</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={16} />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"></a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col items-center text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Labcare Instruments. All rights reserved.</p>
          <p className="mt-2">Good Quality Products at the Best Rate</p>
        </div>
      </div>
    </footer>);

};

// Floating Buttons
const FloatingButtons = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn p-4 rounded-full shadow-2xl text-white"
        data-testid="floating-whatsapp"
        aria-label="Chat on WhatsApp">

        <MessageCircle size={28} />
      </a>

      {/* Free Consultation Button */}
      <button
        onClick={scrollToContact}
        className="floating-btn bg-[#0891b2] text-white px-6 py-4 rounded-full shadow-2xl font-semibold flex items-center gap-2 hover:bg-[#0e7490] transition-colors"
        data-testid="floating-consultation">

        <HeadphonesIcon size={20} />
        Free Consultation
      </button>
    </div>);

};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Toaster position="top-center" richColors />
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <WhyChooseSection />
        <ComparisonSection />
        <ServicesSection />
        <OrderingSection />
        <OfferSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>);

};

export default LandingPage;