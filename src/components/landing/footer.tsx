'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faRedditAlien, faYoutube, faDiscord, faFacebookF ,faTwitter,faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";


import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
             
              <span className="text-xl font-bold  bg-clip-text text-primary ">
                IACO
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-sm">
              Your AI-powered crypto learning assistant. Master cryptocurrency with
              personalized guidance, real-time portfolio tracking, and educational insights
              designed for beginners.
            </p>
            <div className="flex gap-3">
             
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-lg border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center">
                <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center">
                <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center">
                <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Reddit" className="w-9 h-9 rounded-lg border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center">
                <FontAwesomeIcon icon={faRedditAlien} className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-lg border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center">
                <FontAwesomeIcon icon={faYoutube} className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Discord" className="w-9 h-9 rounded-lg border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center">
                <FontAwesomeIcon icon={faDiscord} className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center">
                <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@iaco.com"
                aria-label="Email"
                className="w-9 h-9 rounded-lg border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#prices"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Live Prices
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Learning Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} IACO. All rights reserved. 
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>⚠️</span>
              <p className="max-w-md text-center md:text-right">
                Educational purposes only. Not financial advice. Always DYOR.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
