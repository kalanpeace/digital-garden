'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './TerminalGame.module.css'; // Reusing the existing styles

// Define different categories of hints
const HINT_CATEGORIES = [
  {
    name: "Technology",
    hints: [
      {
        hint: "I am something people use every day, but rarely think about. I connect the world but have no physical form.",
        answer: "internet",
        difficulty: "Easy"
      },
      {
        hint: "I process information without thinking. I have a brain made of silicon.",
        answer: "computer",
        difficulty: "Easy"
      },
      {
        hint: "I'm a language that doesn't use words, only 1s and 0s.",
        answer: "binary",
        difficulty: "Medium"
      },
      {
        hint: "I store data in tables, rows, and columns. Most websites use me behind the scenes.",
        answer: "database",
        difficulty: "Medium"
      },
      {
        hint: "I'm what developers use to track changes in their code. My name suggests branching paths.",
        answer: "git",
        difficulty: "Medium"
      },
      {
        hint: "I'm a global network that allows devices to communicate. I have my own protocol.",
        answer: "internet protocol",
        difficulty: "Hard"
      }
    ]
  },
  {
    name: "Programming",
    hints: [
      {
        hint: "I'm a way to tell the computer exactly what to do, step by step.",
        answer: "algorithm",
        difficulty: "Easy"
      },
      {
        hint: "I'm a data structure that follows Last-In-First-Out principles.",
        answer: "stack",
        difficulty: "Medium"
      },
      {
        hint: "I'm what programmers use to document their thought process. I'm like a gardener's journal but for code.",
        answer: "commenting",
        difficulty: "Medium"
      },
      {
        hint: "I'm the art of breaking complex systems into smaller, manageable components.",
        answer: "modularity",
        difficulty: "Hard"
      },
      {
        hint: "I'm a programming concept where one entity contains another entity of the same type.",
        answer: "recursion",
        difficulty: "Hard"
      },
      {
        hint: "I help keep your code clean by separating what a function does from how it works.",
        answer: "abstraction",
        difficulty: "Hard"
      }
    ]
  },
  {
    name: "AI & Machine Learning",
    hints: [
      {
        hint: "I'm an intelligence that can learn but wasn't born. I power many modern applications.",
        answer: "artificial intelligence",
        difficulty: "Easy"
      },
      {
        hint: "I'm the process of computers learning patterns from data without explicit instructions.",
        answer: "machine learning",
        difficulty: "Medium"
      },
      {
        hint: "I'm a type of AI system inspired by the human brain's structure.",
        answer: "neural network",
        difficulty: "Medium"
      },
      {
        hint: "I'm the field where AI systems learn which actions maximize rewards over time.",
        answer: "reinforcement learning",
        difficulty: "Hard"
      },
      {
        hint: "I'm what AI systems do when they assign items to categories they weren't explicitly taught.",
        answer: "unsupervised learning",
        difficulty: "Hard"
      },
      {
        hint: "I'm the ability of AI systems to process and understand human language.",
        answer: "natural language processing",
        difficulty: "Hard"
      }
    ]
  },
  {
    name: "Web Development",
    hints: [
      {
        hint: "I'm a virtual space where ideas grow organically. Kalan's website is one of these.",
        answer: "digital garden",
        difficulty: "Medium"
      },
      {
        hint: "I'm a methodology where projects are shared as they're built, not just when finished.",
        answer: "build in public",
        difficulty: "Medium"
      },
      {
        hint: "I'm what makes websites interactive and dynamic on the client side.",
        answer: "javascript",
        difficulty: "Easy"
      },
      {
        hint: "I'm the standard language used to structure content on the web.",
        answer: "html",
        difficulty: "Easy"
      },
      {
        hint: "I'm used to style web pages and make them visually appealing.",
        answer: "css",
        difficulty: "Easy"
      },
      {
        hint: "I'm a modern approach to building web applications, where components update without refreshing the page.",
        answer: "single page application",
        difficulty: "Hard"
      }
    ]
  }
];

// Flatten all hints into a single array for random selection
const createHintPool = () => {
  let allHints: { category: string; hint: string; answer: string; difficulty: string; }[] = [];
  HINT_CATEGORIES.forEach(category => {
    category.hints.forEach(hint => {
      allHints.push({
        ...hint,
        category: category.name
      });
    });
  });
  return allHints;
};

// Shuffle array function using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const HintGame = () => {
  const router = useRouter();
  
  // Terminal state
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Game state
  const [hintPool, setHintPool] = useState<{ category: string; hint: string; answer: string; difficulty: string; }[]>([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showAccessButtons, setShowAccessButtons] = useState(false);
  
  // Add a line to the terminal
  const addTerminalLine = (line: string) => {
    setTerminalLines(prev => {
      // Keep only the most recent lines to prevent overflow
      const newLines = [...prev, line];
      if (newLines.length > 15) {
        return newLines.slice(newLines.length - 15);
      }
      return newLines;
    });
  };
  
  // Focus on the input field
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameStarted, currentHintIndex]);
  
  // Initialize hint pool
  useEffect(() => {
    const allHints = createHintPool();
    setHintPool(shuffleArray(allHints));
  }, []);
  
  // Start the game
  const startGame = () => {
    // Shuffle hints for a new game
    setHintPool(shuffleArray(createHintPool()));
    
    setTerminalLines([]);
    addTerminalLine('> START');
    setGameStarted(false);
    setCurrentHintIndex(-1);
    setScore(0);
    setAttempts(0);
    setGameOver(false);
    setShowAccessButtons(false);
  };
  
  // Initialize the game on component mount
  useEffect(() => {
    startGame();
  }, []);
  
  // Process user input
  const processInput = (input: string) => {
    const cleanInput = input.trim().toLowerCase();
    
    // Process different commands based on game state
    if (!gameStarted) {
      if (cleanInput === 'start') {
        startRound();
      }
    } else if (gameOver) {
      if (cleanInput === 'restart') {
        startGame();
      } else if (cleanInput === 'exit') {
        // Return to terminal
        router.push('/terminal');
      } else {
        addTerminalLine('> RESTART / EXIT');
      }
    } else if (showAccessButtons) {
      if (cleanInput === 'continue') {
        setShowAccessButtons(false);
        startRound();
      } else if (cleanInput === 'terminal') {
        // Go to terminal page
        router.push('/terminal');
      } else {
        addTerminalLine('> TYPE "CONTINUE" OR "TERMINAL"');
      }
    } else {
      // Game is active, check answer
      checkAnswer(cleanInput);
    }
    
    // Clear input field
    setCurrentLine('');
  };
  
  // Start a new round with a new hint
  const startRound = () => {
    setGameStarted(true);
    setTerminalLines([]); // Clear terminal for new hint
    setShowAccessButtons(false);
    
    // Get next hint
    const nextIndex = currentHintIndex + 1;
    
    if (nextIndex >= hintPool.length) {
      // All hints have been used, game over
      endGame(true);
      return;
    }
    
    setCurrentHintIndex(nextIndex);
    const hint = hintPool[nextIndex];
    
    addTerminalLine(`> CATEGORY: ${hint.category}`);
    addTerminalLine(`> "${hint.hint}"`);
    addTerminalLine(`> DIFFICULTY: ${hint.difficulty}`);
    
    setAttempts(0);
  };
  
  // Check the user's answer
  const checkAnswer = (answer: string) => {
    setAttempts(prev => prev + 1);
    const currentHint = hintPool[currentHintIndex];
    
    if (answer.toLowerCase() === currentHint.answer.toLowerCase()) {
      // Correct answer
      addTerminalLine('> CORRECT');
      
      // Award points based on difficulty and attempts
      let pointsEarned = 0;
      switch (currentHint.difficulty) {
        case 'Easy':
          pointsEarned = Math.max(10 - (attempts * 2), 1);
          break;
        case 'Medium':
          pointsEarned = Math.max(20 - (attempts * 3), 2);
          break;
        case 'Hard':
          pointsEarned = Math.max(30 - (attempts * 4), 3);
          break;
        default:
          pointsEarned = 5;
      }
      
      setScore(prev => prev + pointsEarned);
      addTerminalLine(`> +${pointsEarned} POINTS`);
      
      // Show access buttons after correct answer
      setInputDisabled(true);
      
      setTimeout(() => {
        setTerminalLines([]);
        addTerminalLine('> ACCESS GRANTED');
        addTerminalLine('> TERMINAL ACCESS AVAILABLE');
        addTerminalLine('> TYPE "TERMINAL" TO ENTER TERMINAL');
        addTerminalLine('> TYPE "CONTINUE" TO KEEP PLAYING');
        setInputDisabled(false);
        setShowAccessButtons(true);
      }, 1000);
    } else {
      // Wrong answer
      if (attempts >= 2) { // Reduced from 3 to 2 for faster gameplay
        // Too many attempts
        addTerminalLine('> INCORRECT');
        addTerminalLine(`> ANSWER: ${currentHint.answer.toUpperCase()}`);
        
        // Brief pause before next hint
        setInputDisabled(true);
        setTimeout(() => {
          setInputDisabled(false);
          startRound();
        }, 1500);
      } else {
        // Still has attempts left
        addTerminalLine('> TRY AGAIN');
      }
    }
  };
  
  // Go to terminal page
  const goToTerminal = () => {
    router.push('/terminal');
  };
  
  // Continue playing
  const continuePlaying = () => {
    setShowAccessButtons(false);
    startRound();
  };
  
  // End the game
  const endGame = (completed: boolean) => {
    setGameOver(true);
    setTerminalLines([]); // Clear terminal for end game message
    
    if (completed) {
      addTerminalLine('> GAME COMPLETE');
    } else {
      addTerminalLine('> GAME OVER');
    }
    
    addTerminalLine(`> SCORE: ${score}`);
    addTerminalLine('> RESTART / EXIT');
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLine(e.target.value);
  };
  
  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputDisabled && currentLine.trim()) {
      processInput(currentLine);
    }
  };
  
  // Auto-focus input when disabled state changes
  useEffect(() => {
    if (!inputDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputDisabled]);
  
  // Add keyboard shortcuts for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) {
        if (e.key === 'r' || e.key === 'R') {
          startGame();
        } else if (e.key === 'e' || e.key === 'E') {
          router.push('/terminal');
        }
      } else if (showAccessButtons) {
        if (e.key === 'c' || e.key === 'C') {
          continuePlaying();
        } else if (e.key === 't' || e.key === 'T') {
          goToTerminal();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver, showAccessButtons, router]);
  
  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalTitle}>TERMINAL SYSTEM</div>
        <div className={styles.terminalStatus}>SECURE CONNECTION</div>
      </div>
      
      <div className={styles.terminalScreen} style={{ overflow: 'hidden' }}>
        <div className={styles.scanlines}></div>
        <div className={styles.screenGlow}></div>
        
        <div className={styles.terminalOutput} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          {terminalLines.map((line, i) => (
            <div key={i} className={styles.line} style={{ whiteSpace: 'pre-wrap', width: '100%' }}>
              {line}
            </div>
          ))}
          
          {showAccessButtons && (
            <div className={styles.buttonsContainer}>
              <button
                className={`${styles.button} ${styles.accessButton}`}
                onClick={goToTerminal}
                type="button"
              >
                ENTER TERMINAL
              </button>
              <button
                className={`${styles.button} ${styles.tryAgainButton}`}
                onClick={continuePlaying}
                type="button"
              >
                CONTINUE PLAYING
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.terminalControls}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.statsBar}>
            <div className={styles.stat}>SCORE: {score}</div>
            <div className={styles.stat}>
              {showAccessButtons ? 
                "TERMINAL / CONTINUE" :
                gameStarted ? 
                  `HINT: ${currentHintIndex + 1}/${hintPool.length}` : 
                  "TYPE 'START'"
              }
            </div>
          </div>
          
          <div className={styles.inputContainer}>
            <span className={styles.prompt}>&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={currentLine}
              onChange={handleInputChange}
              className={styles.input}
              disabled={inputDisabled}
              autoFocus
              aria-label="Terminal input"
              placeholder={
                showAccessButtons ? "Type 'terminal' or 'continue'" :
                gameStarted ? "Enter answer..." : "Type 'start'"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default HintGame; 