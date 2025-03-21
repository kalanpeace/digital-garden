'use client';

import * as React from 'react';
import Link from 'next/link';
import HintGame from '@components/HintGame';
import styles from './page.module.css';

export default function GamePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <Link href="/" className={styles.backLink}>
            Return to Main System
          </Link>
        </div>
        
        <div className={styles.gameContainer}>
          <h1 className={styles.title}>TERMINAL RUNNER</h1>
          
          <div className={styles.instructionsContainer}>
            <p className={styles.instructions}>
              Navigate the system with your knowledge.
            </p>
            <p className={styles.hint}>
              START to begin.
            </p>
          </div>
          
          <HintGame />
        </div>
      </div>
    </div>
  );
}
