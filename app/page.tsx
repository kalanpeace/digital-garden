'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from './page.module.css';

// This is a brand new professional page, abandoning the terminal aesthetic for a clean, modern design

export default function Page() {
  // Ref for sections that need animation
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Animation observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Get all sections that need animation
    const sections = document.querySelectorAll(`.${styles.section}, .${styles.gameSection}`);
    
    // Observe each section
    sections.forEach(section => {
      observer.observe(section);
      sectionsRef.current.push(section as HTMLElement);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Kalan Peace',
              url: 'https://kalanpeace.com',
              jobTitle: 'AI Tools Expert & Founder',
              worksFor: {
                '@type': 'Organization',
                name: 'Vindael Agency'
              },
              description: 'AI Tools Expert & Business Automation Specialist | Studying ML and AI',
              email: 'kalan@vindael.com',
              sameAs: [
                'https://x.com/kalantheconuqer',
                'https://youtube.com/kalanpeace',
                'https://linkedin.com/in/kalanpeace'
              ]
            })
          }}
        />
      </Head>
      
      <div className={styles.container}>
        {/* Hero Section */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              Kalan Peace
            </h1>
            <p className={styles.subtitle}>
              AI Tools Expert | Business Automation Specialist | Founder of Vindael Agency
            </p>
            <div className={styles.divider}></div>
          </div>
        </header>

        {/* Professional Profile */}
        <section className={`${styles.section} ${styles.alternate}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Professional Profile</h2>
            <p className={styles.text}>
              I'm Kalan Peace, an AI tools expert and founder of Vindael Agency, where we help businesses implement AI and automation solutions into their existing software and workflows.
              While studying ML and AI, I apply cutting-edge technologies to solve real-world business problems and significantly enhance operational efficiency for our clients.
              My passion lies in making advanced AI tools accessible and practical for businesses of all sizes.
            </p>
            
            <h3 className={styles.sectionTitle}>Current Ventures</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.listItemBullet}>•</span>
                <span>Founder & CEO of Vindael Agency</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.listItemBullet}>•</span>
                <span>AI Tools & Integration Expert</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.listItemBullet}>•</span>
                <span>Business Process Automation Specialist</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.listItemBullet}>•</span>
                <span>Studying ML and AI Technologies</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Vindael Agency */}
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Vindael Agency</h2>
            <p className={styles.text}>
              At Vindael Agency, we specialize in integrating AI tools and automation solutions into existing business systems. Our expertise lies in creating seamless connections between cutting-edge AI technologies and your current software stack, enhancing capabilities without disrupting workflows.
            </p>
            
            <h3 className={styles.sectionTitle}>Key Services</h3>
            <div className={styles.cardGrid}>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>AI Tools Integration</h4>
                <p className={styles.cardText}>Implementing and connecting AI capabilities with your existing software ecosystem.</p>
              </div>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>Workflow Automation</h4>
                <p className={styles.cardText}>Building custom automation systems to eliminate repetitive tasks and streamline operations.</p>
              </div>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>AI Strategy Consulting</h4>
                <p className={styles.cardText}>Developing comprehensive roadmaps for AI adoption and implementation in your business.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className={`${styles.section} ${styles.alternate}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Projects & Achievements</h2>
            <p className={styles.text}>
              I'm constantly developing innovative projects that push the boundaries of what's possible with AI and automation. My work focuses on creating practical solutions that seamlessly integrate with existing business systems and deliver measurable results.
            </p>
            
            <h3 className={styles.sectionTitle}>Current Projects</h3>
            <div className={styles.cardGrid}>
              <div className={`${styles.card} ${styles.whiteCard}`}>
                <h4 className={styles.cardTitle}>InventoryAgent.ai</h4>
                <p className={styles.cardText}>AI-powered inventory management system with predictive ordering capabilities</p>
              </div>
              <div className={`${styles.card} ${styles.whiteCard}`}>
                <h4 className={styles.cardTitle}>AI Integration Framework</h4>
                <p className={styles.cardText}>Proprietary system for seamlessly connecting AI tools with existing business software</p>
              </div>
              <div className={`${styles.card} ${styles.whiteCard}`}>
                <h4 className={styles.cardTitle}>AutoFlow Suite</h4>
                <p className={styles.cardText}>No-code automation platform for businesses to build custom workflow solutions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Social */}
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Connect With Me</h2>
            <div className={styles.cardGrid}>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>Business Inquiries</h4>
                <p className={styles.cardText}>kalan@vindael.com</p>
              </div>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>Social Media</h4>
                <p className={styles.cardText}>
                  <a href="https://x.com/kalantheconuqer" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>X (Twitter)</a> | 
                  <a href="https://youtube.com/kalanpeace" target="_blank" rel="noopener noreferrer" className={styles.socialLink}> YouTube</a> | 
                  <a href="https://linkedin.com/in/kalanpeace" target="_blank" rel="noopener noreferrer" className={styles.socialLink}> LinkedIn</a>
                </p>
              </div>
              <div className={styles.card}>
                <h4 className={styles.cardTitle}>Location</h4>
                <p className={styles.cardText}>Remote | Michigan</p>
              </div>
            </div>
          </div>
        </section>

        {/* Game Section */}
        <section className={styles.gameSection}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Want to try something fun?</h2>
            <p className={styles.text}>
              Test your knowledge with the Terminal Hint Game!
            </p>
            <Link href="/game" className={styles.button}>
              Play Hint Game
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Kalan Peace. All rights reserved.
            </p>
            <p className={styles.footerTagline}>
              AI Tools Expert • Automation Specialist • Entrepreneur
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
