'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What is IACO and how does it help me learn about cryptocurrency?',
    answer:
      'IACO is an AI-powered crypto learning assistant designed specifically for beginners. It provides personalized guidance through conversational AI, helps you track your portfolio, and offers educational resources to help you understand cryptocurrency concepts in a beginner-friendly way.',
  },
  {
    question: 'Is IACO free to use?',
    answer:
      'Yes! IACO offers a free tier that includes access to our AI coach, basic portfolio tracking, and educational content. We believe everyone should have access to quality crypto education.',
  },
  {
    question: 'How does the AI coach work?',
    answer:
      'Our AI coach uses advanced language models to provide personalized guidance based on your experience level, investment goals, and risk tolerance. It can answer questions, explain concepts, and provide educational insights - but remember, it\'s for educational purposes only, not financial advice.',
  },
  {
    question: 'Is my data and portfolio information secure?',
    answer:
      'Absolutely. We take security seriously. All API credentials are encrypted, we use secure authentication through Google OAuth, and we never store your exchange passwords. Your Binance API keys are stored with bank-level encryption and are only used for read-only operations.',
  },
  {
    question: 'Do I need a Binance account to use IACO?',
    answer:
      'No, you can use IACO to learn about cryptocurrency without a Binance account. However, to track your portfolio in real-time, you\'ll need to connect your Binance account using read-only API keys.',
  },
  {
    question: 'Does IACO provide financial advice?',
    answer:
      'No, IACO is strictly an educational platform. While our AI coach can explain concepts and provide information about cryptocurrency, it does not provide financial advice. Always do your own research and consult with licensed financial professionals before making investment decisions.',
  },
  {
    question: 'Can I use IACO on my mobile device?',
    answer:
      'Yes! IACO is fully responsive and works great on mobile devices, tablets, and desktops. You can access your portfolio and chat with the AI coach from anywhere.',
  },
  {
    question: 'How often is the price data updated?',
    answer:
      'Our live price data is fetched directly from Binance and updates every 30 seconds to ensure you have the most current market information.',
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(accordionRef.current, {
        scrollTrigger: {
          trigger: accordionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked{' '}
            <span className=" bg-clip-text ">
              Questions
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers. Learn more about how IACO can help you on
            your crypto journey.
          </p>
        </div>

        <div ref={accordionRef} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-card hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
