'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './TerminalGame.module.css';

// Define types for the Pixel Runner game
type Position = { x: number; y: number };

interface Entity extends Position {
  id: string;
  width: number;
  height: number;
}

interface Player extends Entity {
  isJumping: boolean;
  jumpHeight: number;
  jumpSpeed: number;
  groundY: number;
}

interface Obstacle extends Entity {
  speed: number;
}

const TerminalGame = () => {
  const router = useRouter();
  
  // Terminal state
  const [showingTerminal, setShowingTerminal] = useState(true);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [showGameOver, setShowGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [player, setPlayer] = useState<Player | null>(null);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameSpeed, setGameSpeed] = useState(1);
  
  // Game dimensions
  const [gameWidth, setGameWidth] = useState(0);
  const [gameHeight, setGameHeight] = useState(0);
  
  // Refs
  const gameLoopRef = useRef<number | null>(null);
  const obstacleSpawnRef = useRef<NodeJS.Timeout | null>(null);
  const scoreIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const jumpCooldownRef = useRef<boolean>(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  // Game constants
  const PLAYER_WIDTH = 20;
  const PLAYER_HEIGHT = 30;
  const OBSTACLE_WIDTH = 20;
  const OBSTACLE_HEIGHT = 20;
  const JUMP_HEIGHT = 80;
  const JUMP_DURATION = 500;
  const OBSTACLE_SPEED = 6;
  const OBSTACLE_SPAWN_INTERVAL_MIN = 1200;
  const OBSTACLE_SPAWN_INTERVAL_MAX = 2000;
  const SCORE_INTERVAL = 100;
  const GRAVITY = 0.8;
  const JUMP_FORCE = -10;
  
  // Calculate game dimensions based on available space
  const updateGameDimensions = useCallback(() => {
    if (gameAreaRef.current) {
      setGameWidth(gameAreaRef.current.clientWidth);
      setGameHeight(gameAreaRef.current.clientHeight);
    }
  }, []);
  
  // Add a line to the terminal
  const addTerminalLine = (line: string) => {
    setTerminalLines(prev => [...prev, line]);
  };
  
  // Initialize the player
  const initializePlayer = useCallback(() => {
    const groundY = Math.min(gameHeight - 50, gameHeight * 0.8);
    
    setPlayer({
      id: 'player',
      x: 50,
      y: groundY - PLAYER_HEIGHT,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      isJumping: false,
      jumpHeight: JUMP_HEIGHT,
      jumpSpeed: JUMP_HEIGHT / (JUMP_DURATION / 1000 * 60),
      groundY: groundY
    });
    
    console.log("Player initialized with groundY:", groundY, "gameHeight:", gameHeight);
  }, [gameHeight, PLAYER_HEIGHT, PLAYER_WIDTH, JUMP_HEIGHT, JUMP_DURATION]);
  
  // Update player state (handle jumping)
  const updatePlayer = useCallback(() => {
    if (!player) return;
    
    setPlayer(prev => {
      if (!prev) return null;
      
      if (prev.isJumping) {
        const newVelocity = prev.jumpSpeed + GRAVITY;
        const newY = prev.y + newVelocity;
        const groundY = prev.groundY - PLAYER_HEIGHT;
        
        const boundedY = Math.max(10, newY);
        
        if (boundedY >= groundY) {
          console.log("Player landed");
          return {
            ...prev,
            y: groundY,
            isJumping: false,
            jumpSpeed: 0
          };
        }
        
        return {
          ...prev,
          y: boundedY,
          jumpSpeed: newVelocity
        };
      }
      
      return prev;
    });
  }, [player, GRAVITY, PLAYER_HEIGHT]);
  
  // Update obstacles
  const updateObstacles = useCallback(() => {
    setObstacles(prev => {
      // Debug current obstacles
      if (prev.length > 0) {
        console.log(`Updating ${prev.length} obstacles with speed ${gameSpeed}`);
      }
      
      // Map obstacles to new positions
      const updatedObstacles = prev
        .map(obstacle => {
          // Calculate new position
          const newX = obstacle.x - (obstacle.speed * gameSpeed);
          return {
            ...obstacle,
            x: newX
          };
        })
        .filter(obstacle => obstacle.x + obstacle.width > -50);
      
      // Debug result
      if (prev.length > 0 && updatedObstacles.length === 0) {
        console.log("All obstacles moved off screen");
      } else if (prev.length !== updatedObstacles.length) {
        console.log(`Removed ${prev.length - updatedObstacles.length} off-screen obstacles`);
      }
      
      return updatedObstacles;
    });
  }, [gameSpeed]);
  
  // Handle navigation to terminal
  const handleNavigateToTerminal = useCallback(() => {
    router.push('/digital-garden/terminal');
  }, [router]);
  
  // Handle game over
  const handleGameOver = useCallback(() => {
    console.log("GAME OVER called - cleaning up resources");
    
    if (gameLoopRef.current) {
      console.log("Cancelling game loop animation frame");
      cancelAnimationFrame(gameLoopRef.current as unknown as number);
      gameLoopRef.current = null;
    }
    
    if (obstacleSpawnRef.current) {
      console.log("Clearing obstacle spawn timer");
      clearTimeout(obstacleSpawnRef.current);
      obstacleSpawnRef.current = null;
    }
    
    if (scoreIntervalRef.current) {
      console.log("Clearing score interval");
      clearInterval(scoreIntervalRef.current);
      scoreIntervalRef.current = null;
    }
    
    setGameStarted(false);
    setShowGameOver(true);
    setShowingTerminal(true);
    
    addTerminalLine('> RUNNER TERMINATED');
    addTerminalLine(`> DISTANCE TRAVELED: ${score}`);
    addTerminalLine('> REDIRECTING TO SECURE TERMINAL');
    addTerminalLine('> PRESS ENTER TO CONTINUE');
  }, [score]);
  
  // Check collisions between player and obstacles
  const checkCollisions = useCallback(() => {
    if (!player) return;
    
    // Create a slightly smaller hitbox for more forgiving collisions
    const playerHitbox = {
      x: player.x + 6,
      y: player.y + 6,
      width: player.width - 12,
      height: player.height - 12
    };
    
    for (const obstacle of obstacles) {
      const obstacleHitbox = {
        x: obstacle.x + 4,
        y: obstacle.y + 4,
        width: obstacle.width - 8,
        height: obstacle.height - 8
      };
      
      const collision = 
        playerHitbox.x < obstacleHitbox.x + obstacleHitbox.width &&
        playerHitbox.x + playerHitbox.width > obstacleHitbox.x &&
        playerHitbox.y < obstacleHitbox.y + obstacleHitbox.height &&
        playerHitbox.y + playerHitbox.height > obstacleHitbox.y;
      
      if (collision) {
        handleGameOver();
        return;
      }
    }
  }, [player, obstacles, handleGameOver]);
  
  // Increase difficulty over time
  const increaseDifficulty = useCallback(() => {
    setGameSpeed(prev => Math.min(prev + 0.1, 3.0));
  }, []);
  
  // Handle jump action
  const handleJump = useCallback(() => {
    if (!player) {
      console.log("No player found to jump");
      return;
    }

    if (!player.isJumping) {
      console.log("JUMP TRIGGERED - Current player state:", player);
      
      const playerElement = document.querySelector(`.${styles.runnerPlayer}`);
      if (playerElement) {
        console.log("DIRECT JUMP via DOM: Adding animation class");
        playerElement.classList.add('jumping');
        setTimeout(() => playerElement.classList.remove('jumping'), 500);
      }

      setPlayer(prev => {
        if (!prev) return null;
        
        console.log("SETTING JUMP STATE");
        return {
          ...prev,
          isJumping: true,
          jumpSpeed: JUMP_FORCE
        };
      });
    }
  }, [player, JUMP_FORCE, styles.runnerPlayer]);
  
  // Spawn an obstacle
  const spawnObstacle = useCallback(() => {
    if (!gameStarted) {
      console.log("Game not started, not spawning obstacles");
      return;
    }

    // Make sure we have valid dimensions
    if (gameWidth <= 0 || gameHeight <= 0) {
      console.log("Invalid game dimensions, cannot spawn obstacles:", gameWidth, gameHeight);
      return;
    }

    // Use the same ground position calculation as the player for consistency
    const groundY = Math.min(gameHeight - 50, gameHeight * 0.8);
    
    // Create random obstacle properties for variety
    const height = OBSTACLE_HEIGHT + Math.floor(Math.random() * 15); // Random height between 20-35px
    const width = OBSTACLE_WIDTH + Math.floor(Math.random() * 10); // Random width between 20-30px
    const speed = OBSTACLE_SPEED * gameSpeed * (0.8 + Math.random() * 0.4); // Speed variation
    
    // Create the obstacle
    const newObstacle: Obstacle = {
      id: `obstacle_${Date.now()}`,
      x: gameWidth, // Place at the right edge of the game area
      y: groundY - height, // Position relative to ground
      width: width,
      height: height,
      speed: speed
    };

    console.log("Creating new obstacle:", newObstacle, "at groundY:", groundY);

    // Force add this obstacle
    setObstacles(prev => [...prev, newObstacle]);

    // Schedule next obstacle with random timing
    // Decrease spawn time as game speed increases for more challenge
    const minTime = Math.max(OBSTACLE_SPAWN_INTERVAL_MIN - (gameSpeed * 200), 600);
    const maxTime = Math.max(OBSTACLE_SPAWN_INTERVAL_MAX - (gameSpeed * 300), 1200);
    
    const nextSpawnTime = Math.random() * (maxTime - minTime) + minTime;
    console.log(`Next obstacle in ${nextSpawnTime}ms at speed ${gameSpeed}`);

    obstacleSpawnRef.current = setTimeout(spawnObstacle, nextSpawnTime);
  }, [gameStarted, gameWidth, gameHeight, gameSpeed, OBSTACLE_HEIGHT, OBSTACLE_WIDTH, OBSTACLE_SPEED, OBSTACLE_SPAWN_INTERVAL_MAX, OBSTACLE_SPAWN_INTERVAL_MIN]);
  
  // Start the game
  const handleStartGame = useCallback(() => {
    updateGameDimensions();
    
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
      // Force update game dimensions immediately
      setGameWidth(gameAreaRef.current.clientWidth);
      setGameHeight(gameAreaRef.current.clientHeight);
      console.log("Forced game dimensions update:", gameAreaRef.current.clientWidth, gameAreaRef.current.clientHeight);
    }
    
    setTimeout(() => {
      setShowingTerminal(false);
      setGameStarted(true);
      setScore(0);
      setObstacles([]);
      setGameSpeed(1);
      
      initializePlayer();
      
      console.log("Game started, player initialized");
      
      // FORCE ADD A TEST OBSTACLE IMMEDIATELY
      setTimeout(() => {
        const groundY = Math.min(gameHeight - 50, gameHeight * 0.8);
        const testObstacle: Obstacle = {
          id: 'test_obstacle_1',
          x: gameWidth - 100, // Place it 100px from right edge so it's visible immediately
          y: groundY - OBSTACLE_HEIGHT,
          width: OBSTACLE_WIDTH,
          height: OBSTACLE_HEIGHT,
          speed: OBSTACLE_SPEED
        };
        
        console.log("FORCING TEST OBSTACLE:", testObstacle, "gameWidth:", gameWidth, "gameHeight:", gameHeight);
        setObstacles([testObstacle]);
      }, 300);
      
      const gameLoop = () => {
        updatePlayer();
        updateObstacles();
        checkCollisions();
        
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      };
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      
      // Start regular obstacle spawning
      console.log("Scheduling first regular obstacle spawn");
      setTimeout(() => {
        spawnObstacle();
      }, 2000);
      
      scoreIntervalRef.current = setInterval(() => {
        setScore(prev => prev + 1);
        
        if ((score + 1) % 20 === 0) {
          increaseDifficulty();
        }
      }, SCORE_INTERVAL);
    }, 100);
  }, [updateGameDimensions, initializePlayer, updatePlayer, updateObstacles, checkCollisions, spawnObstacle, increaseDifficulty, score, gameStarted, showGameOver, gameWidth, gameHeight, OBSTACLE_HEIGHT, OBSTACLE_WIDTH, OBSTACLE_SPEED]);
  
  // Handle terminal input
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!gameStarted && !showGameOver) {
        handleStartGame();
      } else if (showGameOver) {
        handleNavigateToTerminal();
      }
    }
  }, [gameStarted, showGameOver, handleStartGame, handleNavigateToTerminal]);
  
  // Handle mobile tap/touch for jumping
  const handleTouchStart = useCallback(() => {
    if (gameStarted && !showGameOver) {
      handleJump();
    }
  }, [gameStarted, showGameOver, handleJump]);
  
  // NOW that all functions are defined, we can use them in useEffects
  
  // Initialize the game on mount and handle window resize
  useEffect(() => {
    updateGameDimensions();
    
    addTerminalLine('> TERMINAL RUNNER INITIALIZED');
    addTerminalLine('> NAVIGATE THE OBSTACLES TO SURVIVE');
    addTerminalLine('> PRESS SPACE OR ENTER TO START');
    addTerminalLine('> SPACE TO JUMP');
    addTerminalLine('> HOW FAR CAN YOU RUN?');
    
    window.addEventListener('resize', updateGameDimensions);
    
    return () => {
      window.removeEventListener('resize', updateGameDimensions);
      
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current as unknown as number);
      }
      if (obstacleSpawnRef.current) {
        clearInterval(obstacleSpawnRef.current);
      }
      if (scoreIntervalRef.current) {
        clearInterval(scoreIntervalRef.current);
      }
    };
  }, [updateGameDimensions]);
  
  // Focus input when terminal is shown
  useEffect(() => {
    if (showingTerminal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showingTerminal]);
  
  // Global key handler for all keyboard input including jump and game control
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Space or up arrow for jumping or starting game
      if (e.key === ' ' || e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        // If terminal is showing, pressing space will start the game
        if (showingTerminal && !showGameOver) {
          console.log("Space pressed - starting game");
          handleStartGame();
          return;
        }
        
        // If game is running, jump
        if (gameStarted && !showGameOver) {
          console.log("SPACE KEY DETECTED - JUMP NOW");
          handleJump();
          
          const playerElement = document.querySelector(`.${styles.runnerPlayer}`) as HTMLElement;
          if (playerElement) {
            playerElement.style.transition = 'top 0.5s cubic-bezier(0.17, 0.89, 0.32, 1.25)';
            playerElement.style.top = `${parseInt(playerElement.style.top || '0') - 100}px`;
            setTimeout(() => {
              playerElement.style.top = `${parseInt(playerElement.style.top || '0') + 100}px`;
            }, 250);
          }
        }
      }
      
      // Enter key handling
      if (e.key === 'Enter') {
        e.preventDefault();
        
        // Start game with Enter
        if (!gameStarted && !showGameOver) {
          console.log("Start game with Enter key");
          handleStartGame();
        }
        
        // Navigate to terminal after game over
        if (showGameOver) {
          console.log("Navigate to terminal after game over");
          handleNavigateToTerminal();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress, true);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress, true);
    };
  }, [gameStarted, showGameOver, showingTerminal, handleJump, handleStartGame, handleNavigateToTerminal, styles.runnerPlayer]);
  
  // Add styles for the player character
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .${styles.runnerPlayer} {
        background: linear-gradient(135deg, #ff5555, #ff3333);
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
        border: 2px solid #ffffff;
        border-radius: 4px;
        position: absolute;
        transform-origin: bottom center;
      }
      
      .${styles.runnerPlayer}::after {
        content: '';
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        width: 8px;
        height: 8px;
        background-color: #ffffff;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
      }
      
      .jumping {
        animation: jumpAnimation 0.5s ease-out;
        transform-origin: bottom center;
      }
      
      @keyframes jumpAnimation {
        0% { transform: translateY(0); }
        50% { transform: translateY(-${JUMP_HEIGHT * 0.8}px); }
        100% { transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [styles.runnerPlayer]);
  
  // Add this style directly to the document to enhance obstacle appearance
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .${styles.obstacle} {
        background: linear-gradient(135deg, #ff3333, #aa0000);
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
        border: 2px solid #ffffff;
        border-radius: 4px;
        position: absolute;
        transform-origin: bottom center;
        animation: obstacleFloat 0.8s ease-in-out infinite alternate;
        z-index: 5;
      }
      
      @keyframes obstacleFloat {
        0% {
          transform: translateY(0) rotate(0deg);
        }
        100% {
          transform: translateY(-3px) rotate(2deg);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [styles.obstacle]);
  
  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalTitle}>PIXEL RUNNER</div>
        <div className={styles.terminalStatus}>{gameStarted ? 'ACTIVE' : 'STANDBY'}</div>
      </div>
      
      <div 
        ref={gameAreaRef}
        className={styles.terminalScreen}
        onTouchStart={handleTouchStart}
        onKeyDown={(e) => {
          console.log("Game board key event:", e.key);
          if (gameStarted && !showGameOver && (e.key === ' ' || e.code === 'Space' || e.key === 'ArrowUp')) {
            e.preventDefault();
            handleJump();
          }
        }}
        tabIndex={0}
      >
        {showingTerminal ? (
          <div className={styles.terminalOutput}>
            {terminalLines.map((line, index) => (
              <div key={index} className={styles.line}>
                {line}
              </div>
            ))}
            <div className={styles.terminalInput}>
              <span className={styles.prompt}>&gt;</span>
              <input
                ref={inputRef}
                type="text"
                className={styles.input}
                value={currentLine}
                onChange={e => setCurrentLine(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={showGameOver ? "PRESS ENTER TO CONTINUE" : "PRESS ENTER TO START"}
              />
              <span className={styles.blink}>█</span>
            </div>
          </div>
        ) : (
          <div 
            className={styles.gameBoard}
            style={{ width: `${gameWidth}px`, height: `${gameHeight}px` }}
          >
            {/* Ground */}
            <div className={styles.ground} style={{ bottom: '30px' }} />
            
            {/* Player */}
            {player && (
              <div
                className={styles.runnerPlayer}
                style={{
                  left: `${player.x}px`,
                  top: `${player.y}px`,
                  width: `${player.width}px`,
                  height: `${player.height}px`
                }}
              />
            )}
            
            {/* Obstacles */}
            {obstacles.length > 0 ? (
              obstacles.map(obstacle => (
                <div
                  key={obstacle.id}
                  className={styles.obstacle}
                  style={{
                    left: `${obstacle.x}px`,
                    top: `${obstacle.y}px`,
                    width: `${obstacle.width}px`,
                    height: `${obstacle.height}px`,
                    background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                    boxShadow: '0 0 20px #ff0000, 0 0 30px #ff0000',
                    border: '3px solid #ffffff',
                    borderRadius: '4px',
                    position: 'absolute',
                    zIndex: 10
                  }}
                />
              ))
            ) : (
              <div style={{ position: 'absolute', top: '50px', left: '50px', color: 'white', zIndex: 100 }}>
                No obstacles yet! ({gameWidth}x{gameHeight})
              </div>
            )}
            
            {/* Score display */}
            <div className={styles.scoreDisplay}>
              SCORE: {score}
            </div>
            
            {/* Jump instruction */}
            <div className={styles.instructionDisplay}>
              TAP/SPACE TO JUMP
            </div>
          </div>
        )}
        
        <div className={styles.scanlines}></div>
        <div className={styles.screenGlow}></div>
      </div>
      
      {showGameOver && (
        <div className={styles.buttonsContainer}>
          <div 
            className={`${styles.button} ${styles.accessButton}`}
            onClick={handleNavigateToTerminal}
          >
            ACCESS TERMINAL
          </div>
        </div>
      )}
      
      <div className={styles.statsBar}>
        <div className={styles.stat}>STATUS: {gameStarted ? 'RUNNING' : 'STANDBY'}</div>
        <div className={styles.stat}>SCORE: {score}</div>
        {gameStarted && <div className={styles.stat}>SPEED: {gameSpeed.toFixed(1)}x</div>}
      </div>
    </div>
  );
};

export default TerminalGame;
