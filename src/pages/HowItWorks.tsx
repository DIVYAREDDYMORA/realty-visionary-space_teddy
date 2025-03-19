
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UsersRound, 
  Wallet, 
  Search, 
  Building, 
  FileCheck, 
  LayoutDashboard,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Clock,
  FileText,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);

  const stepVariants = {
    active: { scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" },
    inactive: { scale: 1, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }
  };

  const processSteps = [
    {
      step: 1,
      title: "Create an account",
      description: "Register and verify your account in minutes",
      icon: <UsersRound className="h-12 w-12 text-primary" />,
    },
    {
      step: 2,
      title: "Connect your wallet",
      description: "Link your MetaMask, WalletConnect, or other wallet",
      icon: <Wallet className="h-12 w-12 text-primary" />,
    },
    {
      step: 3,
      title: "Browse properties",
      description: "Explore available properties on our marketplace",
      icon: <Search className="h-12 w-12 text-primary" />,
    },
    {
      step: 4,
      title: "Buy or list property",
      description: "Purchase or tokenize your property as an NFT",
      icon: <Building className="h-12 w-12 text-primary" />,
    },
    {
      step: 5,
      title: "Sign smart contract",
      description: "Securely execute the transaction on blockchain",
      icon: <FileCheck className="h-12 w-12 text-primary" />,
    },
    {
      step: 6,
      title: "Manage ownership",
      description: "Track your digital assets in your dashboard",
      icon: <LayoutDashboard className="h-12 w-12 text-primary" />,
    },
  ];

  const benefits = [
    {
      title: "Decentralized ownership",
      description: "Full control of your digital property deeds with no intermediaries",
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    },
    {
      title: "Instant transfer",
      description: "Complete property transactions in minutes, not months",
      icon: <ArrowRight className="h-8 w-8 text-primary" />,
    },
    {
      title: "Transparent records",
      description: "All transactions are recorded on a public, immutable blockchain",
      icon: <RefreshCw className="h-8 w-8 text-primary" />,
    },
    {
      title: "Lower transaction fees",
      description: "Save on traditional real estate closing costs and fees",
      icon: <Clock className="h-8 w-8 text-primary" />,
    },
  ];

  const faqs = [
    {
      question: "What is an NFT property?",
      answer: "An NFT property is a digital representation of real estate ownership rights that is secured and verified on the blockchain. Each NFT is unique and contains metadata about the property, including legal information, images, and history of ownership."
    },
    {
      question: "Do I need crypto to start?",
      answer: "Yes, you'll need cryptocurrency to purchase properties on our platform. We currently support Ethereum (ETH) and other selected tokens. However, you can browse properties without any crypto, and we offer guides to help you get started with purchasing your first crypto."
    },
    {
      question: "How do I sell my property?",
      answer: "To sell a property, you need to connect your wallet, verify ownership, and list the property on our marketplace. You'll set the price, add property details, and once listed, interested buyers can make offers or purchase directly. The transaction is secured by smart contracts."
    },
    {
      question: "What wallets are supported?",
      answer: "We support popular Web3 wallets including MetaMask, WalletConnect, Coinbase Wallet, and OKX Wallet. We recommend MetaMask for the best experience, but you're free to use any of our supported options."
    },
    {
      question: "Is KYC verification required?",
      answer: "Yes, to ensure compliance with regulations and prevent fraud, we require all users to complete a Know Your Customer (KYC) verification process before buying or selling properties on our platform."
    },
  ];

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              How Our Platform Works
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Simplifying Real Estate with NFTs and Blockchain
            </motion.p>
          </div>
        </section>

        {/* Process Steps Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">The Process</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step) => (
                <motion.div
                  key={step.step}
                  className="relative"
                  initial="inactive"
                  whileHover="active"
                  animate={activeStep === step.step ? "active" : "inactive"}
                  variants={stepVariants}
                  onMouseEnter={() => setActiveStep(step.step)}
                >
                  <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-background rounded-full p-2 border-2 border-primary">
                        {step.icon}
                      </div>
                      <div className="mt-8 text-center">
                        <span className="inline-block bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mb-4">
                          {step.step}
                        </span>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Benefits of NFT Real Estate</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Discover how blockchain technology is revolutionizing property ownership
            </p>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerAnimation}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={itemAnimation} className="flex gap-4 items-start">
                  <div className="shrink-0 bg-primary/10 rounded-full p-3">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Smart Contract Workflow */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Smart Contract Workflow</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Understanding how our smart contracts secure your property transactions
            </p>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 z-0"></div>

              {/* Timeline items */}
              <div className="relative z-10">
                {[
                  {
                    title: "Contract Creation",
                    description: "Property details are encoded into a smart contract",
                    icon: <FileText className="h-6 w-6" />
                  },
                  {
                    title: "Buyer Verification",
                    description: "Buyer funds are verified and held in escrow",
                    icon: <CheckCircle className="h-6 w-6" />
                  },
                  {
                    title: "Execution",
                    description: "Contract executes automatically when conditions are met",
                    icon: <RefreshCw className="h-6 w-6" />
                  },
                  {
                    title: "On-Chain Storage",
                    description: "Ownership is permanently recorded on the blockchain",
                    icon: <ShieldCheck className="h-6 w-6" />
                  }
                ].map((item, i) => (
                  <div key={i} className={`flex items-center mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${i % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="z-20 flex items-center justify-center bg-primary text-white rounded-full w-12 h-12 border-4 border-background">
                      {item.icon}
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-card border rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-4">Security & Compliance</h2>
                  <p className="text-muted-foreground mb-6">
                    We take the security of your assets and personal information seriously. Our platform implements industry-leading security practices.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                      <span>KYC/AML verification for all users</span>
                    </li>
                    <li className="flex gap-3">
                      <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                      <span>Secure wallet integration with industry standards</span>
                    </li>
                    <li className="flex gap-3">
                      <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                      <span>Regular security audits of smart contracts</span>
                    </li>
                    <li className="flex gap-3">
                      <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                      <span>Data encryption and privacy protection</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-primary to-primary/60 text-white p-8 md:p-12 flex items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
                    <p className="mb-6">
                      We're committed to making property transactions transparent, secure, and accessible to everyone. Our platform combines the security of blockchain with the reliability of traditional real estate practices.
                    </p>
                    <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                      Learn More About Security
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Get answers to common questions about our platform
            </p>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Join thousands of property investors who are already using our platform to buy, sell, and manage real estate NFTs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/signup">Create Your Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                <Link to="/properties">Browse Properties</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
