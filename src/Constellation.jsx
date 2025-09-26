import React, { useState, useEffect } from 'react';
import './App.css';
const ConstellationGame = () => {
  const [currentView, setCurrentView] = useState('map');
  const [currentPlanet, setCurrentPlanet] = useState(null);
  const [completedPlanets, setCompletedPlanets] = useState(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  const planets = [
    {
      id: 1,
      name: "Mercury of Memories",
      x: 20,
      y: 30,
      color: "#FF6B47",
      questions: [
        { question: "15 + 27 = ?", answer: "42" },
        { question: "8 × 7 = ?", answer: "56" },
        { question: "100 - 37 = ?", answer: "63" }
      ],
      message: "Just like Mercury orbits closest to the sun, you're always closest to my heart ❤️"
    },
    {
      id: 2,
      name: "Venus of Dreams",
      x: 35,
      y: 60,
      color: "#FF69B4",
      questions: [
        { question: "12² = ?", answer: "144" },
        { question: "√64 = ?", answer: "8" },
        { question: "25 ÷ 5 + 10 = ?", answer: "15" }
      ],
      message: "Venus is the planet of love, and you are my universe"
    },
    {
      id: 3,
      name: "Earth of Us",
      x: 50,
      y: 25,
      color: "#4169E1",
      questions: [
        { question: "3 × 15 + 7 = ?", answer: "52" },
        { question: "80 ÷ 4 - 5 = ?", answer: "15" },
        { question: "(6 + 4) × 3 = ?", answer: "30" }
      ],
      message: "Earth is our home, but you make anywhere feel like home to me 🌍"
    },
    {
      id: 4,
      name: "Mars of Passion",
      x: 70,
      y: 45,
      color: "#DC143C",
      questions: [
        { question: "2³ × 5 = ?", answer: "40" },
        { question: "18 + 24 ÷ 3 = ?", answer: "26" },
        { question: "7 × 9 - 13 = ?", answer: "50" }
      ],
      message: "Mars burns red with passion, just like my heart burns for you 🔥"
    },
    {
      id: 5,
      name: "Jupiter of Joy",
      x: 25,
      y: 75,
      color: "#FFA500",
      questions: [
        { question: "15 × 4 - 12 = ?", answer: "48" },
        { question: "√121 + 6 = ?", answer: "17" },
        { question: "33 ÷ 3 + 14 = ?", answer: "25" }
      ],
      message: "Jupiter is the largest planet, but not as large as the joy you bring me ✨"
    },
    {
      id: 6,
      name: "Saturn of Promises",
      x: 75,
      y: 20,
      color: "#9932CC",
      questions: [
        { question: "4! (4 factorial) = ?", answer: "24" },
        { question: "13 × 6 - 18 = ?", answer: "60" },
        { question: "45 ÷ 9 + 16 = ?", answer: "21" }
      ],
      message: "Like Saturn's rings, my promises to you are eternal and unbroken 💍"
    }
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 6 }
  ];

  const handlePlanetClick = (planet) => {
    if (completedPlanets.has(planet.id)) return;
    setCurrentPlanet(planet);
    setCurrentQuestion(0);
    setCurrentView('question');
    setUserAnswer('');
    setShowResult(false);
  };

  const handleAnswerSubmit = () => {
    const correct = userAnswer.trim() === currentPlanet.questions[currentQuestion].answer;
    setShowResult(true);
    
    if (correct) {
      setTimeout(() => {
        if (currentQuestion < currentPlanet.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setUserAnswer('');
          setShowResult(false);
        } else {
          setCompletedPlanets(prev => new Set([...prev, currentPlanet.id]));
          setCurrentView('message');
        }
      }, 1500);
    } else {
      setTimeout(() => {
        setUserAnswer('');
        setShowResult(false);
      }, 1500);
    }
  };

  const handleBackToMap = () => {
    setCurrentView('map');
    setCurrentPlanet(null);
  };

  const allPlanetsCompleted = completedPlanets.size === planets.length;

  if (currentView === 'question' && currentPlanet) {
    return (
      <>
        <section>
          <span></span><span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </section>
        
        <div className="question-container">
          <div className="question-content">
            <h2 className="planet-title">
              {currentPlanet.name}
            </h2>
            
            <div className="question-card">
              <div className="question-counter">
                Question {currentQuestion + 1} of {currentPlanet.questions.length}
              </div>
              
              <div className="question-text">
                {currentPlanet.questions[currentQuestion].question}
              </div>
              
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="answer-input"
                placeholder="Your answer..."
                onKeyPress={(e) => e.key === 'Enter' && !showResult && handleAnswerSubmit()}
              />
              
              {!showResult && (
                <button
                  onClick={handleAnswerSubmit}
                  className="submit-button"
                  style={{ backgroundColor: currentPlanet.color }}
                >
                  Submit Answer
                </button>
              )}
              
              {showResult && (
                <div className={`result ${userAnswer.trim() === currentPlanet.questions[currentQuestion].answer ? 'correct' : 'incorrect'}`}>
                  {userAnswer.trim() === currentPlanet.questions[currentQuestion].answer ? '✅ Correct!' : '❌ Try again!'}
                </div>
              )}
            </div>
            
            <button onClick={handleBackToMap} className="back-button">
              Back to Map
            </button>
          </div>
        </div>
        
        <style jsx>{`
          .question-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 10px;
          }
          
          .question-content {
            text-align: center;
            max-width: 500px;
            width: 100%;
          }
          
          .planet-title {
            color: white;
            font-size: clamp(1.5rem, 4vw, 2rem);
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(255,255,255,0.8);
          }
          
          .question-card {
            background: rgba(0,0,0,0.8);
            padding: clamp(20px, 5vw, 40px);
            border-radius: 20px;
            border: 2px solid rgba(255,255,255,0.3);
            backdrop-filter: blur(10px);
            margin-bottom: 15px;
          }
          
          .question-counter {
            color: white;
            font-size: clamp(1rem, 3vw, 1.2rem);
            margin-bottom: 15px;
          }
          
          .question-text {
            color: white;
            font-size: clamp(1.2rem, 4vw, 1.8rem);
            font-weight: bold;
            margin-bottom: 20px;
            line-height: 1.3;
          }
          
          .answer-input {
            width: 100%;
            padding: 15px;
            font-size: clamp(1.2rem, 4vw, 1.5rem);
            text-align: center;
            background: rgba(255,255,255,0.15);
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 10px;
            color: white;
            outline: none;
            margin-bottom: 15px;
          }
          
          .answer-input::placeholder {
            color: rgba(255,255,255,0.7);
          }
          
          .submit-button, .back-button {
            padding: 12px 25px;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: clamp(1rem, 3vw, 1.1rem);
            cursor: pointer;
            font-weight: bold;
            transition: opacity 0.3s ease;
          }
          
          .submit-button:active, .back-button:active {
            opacity: 0.8;
          }
          
          .back-button {
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.5);
          }
          
          .result {
            margin-top: 15px;
            padding: 15px;
            border-radius: 10px;
            font-size: clamp(1rem, 3vw, 1.2rem);
            font-weight: bold;
            color: white;
          }
          
          .result.correct {
            background: rgba(0,255,0,0.3);
          }
          
          .result.incorrect {
            background: rgba(255,0,0,0.3);
          }
        `}</style>
      </>
    );
  }

  if (currentView === 'message' && currentPlanet) {
    return (
      <>
        <section>
          <span></span><span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </section>
        
        <div className="message-container">
          <div className="message-content">
            <div 
              className="planet-icon"
              style={{ 
                backgroundColor: currentPlanet.color,
                boxShadow: `0 0 30px ${currentPlanet.color}`
              }}
            ></div>
            
            <h2 className="completion-title">
              Planet Completed! 🎉
            </h2>
            
            <div className="message-card">
              <p className="love-message">
                {currentPlanet.message}
              </p>
            </div>
            
            <button
              onClick={handleBackToMap}
              className="continue-button"
              style={{ backgroundColor: currentPlanet.color }}
            >
              Continue Journey
            </button>
          </div>
        </div>
        
        <style jsx>{`
          .message-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 15px;
          }
          
          .message-content {
            text-align: center;
            max-width: 600px;
            width: 100%;
          }
          
          .planet-icon {
            width: clamp(80px, 15vw, 100px);
            height: clamp(80px, 15vw, 100px);
            border-radius: 50%;
            margin: 0 auto 25px;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          .completion-title {
            color: white;
            font-size: clamp(1.8rem, 5vw, 2.5rem);
            margin-bottom: 25px;
            text-shadow: 0 0 10px rgba(255,255,255,0.8);
          }
          
          .message-card {
            background: rgba(0,0,0,0.8);
            padding: clamp(25px, 5vw, 40px);
            border-radius: 20px;
            border: 2px solid rgba(255,255,255,0.3);
            backdrop-filter: blur(10px);
            margin-bottom: 25px;
          }
          
          .love-message {
            color: white;
            font-size: clamp(1.1rem, 3.5vw, 1.3rem);
            line-height: 1.6;
          }
          
          .continue-button {
            padding: 15px 30px;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: clamp(1.1rem, 3vw, 1.2rem);
            cursor: pointer;
            font-weight: bold;
            transition: opacity 0.3s ease;
          }
          
          .continue-button:active {
            opacity: 0.8;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <section>
        <span></span><span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </section>

      <svg className="connections">
        {connections.map((conn, index) => {
          const fromPlanet = planets.find(p => p.id === conn.from);
          const toPlanet = planets.find(p => p.id === conn.to);
          return (
            <line
              key={index}
              x1={`${fromPlanet.x}%`}
              y1={`${fromPlanet.y}%`}
              x2={`${toPlanet.x}%`}
              y2={`${toPlanet.y}%`}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              strokeDasharray="8,8"
            />
          );
        })}
      </svg>

      <div className="game-title">
        <h1>Constellation of Love</h1>
        <p>Explore the planets and solve the mysteries of the universe</p>
      </div>

      {planets.map(planet => (
        <div
          key={planet.id}
          className="planet-container"
          style={{
            left: `${planet.x}%`,
            top: `${planet.y}%`,
          }}
          onClick={() => handlePlanetClick(planet)}
        >
          <div 
            className={`planet-sphere ${completedPlanets.has(planet.id) ? 'completed' : ''}`}
            style={{
              backgroundColor: planet.color,
              boxShadow: `0 0 25px ${planet.color}, 0 0 50px ${planet.color}50`
            }}
          >
            {completedPlanets.has(planet.id) ? '✓' : ''}
          </div>
          
          <div className="planet-name">
            {planet.name}
          </div>
        </div>
      ))}

      <div className="progress-indicator">
        Planets Explored: {completedPlanets.size} / {planets.length}
      </div>

      {allPlanetsCompleted && (
        <div className="final-overlay">
          <div className="final-message">
            <h2 className="final-title">🌟 Journey Complete! 🌟</h2>
            
            <div className="final-text">
              <p>You've explored every planet in our constellation of love. Just like how you solved each challenge with patience and care, you've solved the mystery of my heart.</p>
              
              <p>Waiting for me when I appear, you are My everything, Mon Yassir.</p>
              
              <p>And You are all my power, all my struggles and all my victories.</p>
              
              <p>So tell me would you fall in love with me again? through all my flaws and imperfections? through all my ups and downs? and through all my mistakes and wrong decisions? and through all my fears and insecurities?</p>
              
              <p>would you still love me as much as I love you?</p>
              
              <p>because I promise to love you more and more each day, to cherish and adore you, to support and encourage you, to respect and appreciate you, and to be faithful and loyal to you, for the rest of my life</p>
              
              <p>because you are my soulmate, my best friend, my partner in crime, my rock, my inspiration, my motivation, my reason for living, all my power ALL MY POWER and my strength in this life</p>
              
              <p>You are the first one i had such affinity for, the first one i felt comfortable with, the first one i trusted with my heart, the first one i shared my dreams and fears with, the first one i laughed and cried with, the first one i felt alive with</p>
              
              <p>and I hope to be the last one you will ever need because you complete me in every way possible</p>
              
              <p>So tell me would you fall in love with me again?</p>
              
              <h3 className="special-message">You are what I saved my virginity for :)</h3>
            </div>
            
            <p className="love-declaration">I LOVE YOU! ❤️</p>
            
            <p className="final-note">This whole universe was created just to tell you how much you mean to me. Thank you for being my everything. 💕✨</p>
          </div>
        </div>
      )}

      <style jsx>{`
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        body { 
          overflow: hidden; 
        }
        
        section {
          position: absolute; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100vh;
          background-size: cover;
          animation: animateBg 50s linear infinite;
        }
        
        @keyframes animateBg { 
          0% { transform: scale(1); } 
          50% { transform: scale(1.2); } 
          100% { transform: scale(1); }
        }
        
        span {
          position: absolute; 
          width: clamp(3px, 1vw, 4px); 
          height: clamp(3px, 1vw, 4px); 
          background: #fff; 
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.1), 0 0 0 8px rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.5);
          animation: animate linear infinite;
        }
        
        @keyframes animate {
          0% { transform: rotate(315deg) translateX(0); opacity: 1; }
          100% { transform: rotate(315deg) translateX(-1000px); opacity: 0; }
        }
        
        span::before {
          content: ''; 
          position: absolute; 
          top: 50%; 
          transform: translateY(-50%);
          width: clamp(200px, 50vw, 300px); 
          height: 1px; 
          background: linear-gradient(90deg, #fff, transparent);
        }
        
        span:nth-child(1){ top:10%; left:80%; animation-delay:0s; animation-duration:3s; }
        span:nth-child(2){ top:30%; left:60%; animation-delay:1s; animation-duration:4s; }
        span:nth-child(3){ top:50%; left:70%; animation-delay:2s; animation-duration:5s; }
        span:nth-child(4){ top:20%; left:90%; animation-delay:0.5s; animation-duration:3.5s; }
        span:nth-child(5){ top:70%; left:40%; animation-delay:1.2s; animation-duration:4.2s; }
        span:nth-child(6){ top:80%; left:20%; animation-delay:2.5s; animation-duration:3.8s; }
        span:nth-child(7){ top:15%; left:50%; animation-delay:1.8s; animation-duration:5s; }
        span:nth-child(8){ top:40%; left:30%; animation-delay:0.7s; animation-duration:3s; }
        span:nth-child(9){ top:60%; left:85%; animation-delay:1.5s; animation-duration:4.5s; }
        span:nth-child(10){ top:25%; left:10%; animation-delay:2.2s; animation-duration:3.6s; }
        span:nth-child(11){ top:75%; left:65%; animation-delay:0.9s; animation-duration:4.8s; }
        span:nth-child(12){ top:55%; left:15%; animation-delay:1.7s; animation-duration:3.9s; }
        
        .connections {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 100;
        }
        
        .game-title {
          position: absolute;
          top: clamp(15px, 3vh, 30px);
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 200;
          padding: 0 15px;
        }
        
        .game-title h1 {
          color: white;
          font-size: clamp(1.8rem, 6vw, 3rem);
          font-weight: bold;
          margin-bottom: clamp(5px, 2vh, 10px);
          text-shadow: 0 0 20px rgba(255,255,255,0.8);
        }
        
        .game-title p {
          color: rgba(255,255,255,0.9);
          font-size: clamp(0.9rem, 3vw, 1.2rem);
        }
        
        .planet-container {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          z-index: 200;
          transition: all 0.3s ease;
        }
        
        .planet-container:active {
          transform: translate(-50%, -50%) scale(0.95);
        }
        
        .planet-sphere {
          width: clamp(45px, 10vw, 60px);
          height: clamp(45px, 10vw, 60px);
          border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          font-weight: bold;
          color: white;
          transition: all 0.3s ease;
        }
        
        .planet-sphere.completed {
          opacity: 0.7;
        }
        
        .planet-name {
          color: white;
          font-size: clamp(0.7rem, 2.5vw, 0.9rem);
          text-align: center;
          margin-top: clamp(5px, 1.5vh, 8px);
          font-weight: bold;
          text-shadow: 0 0 10px rgba(0,0,0,0.8);
          line-height: 1.2;
        }
        
        .progress-indicator {
          position: absolute;
          bottom: clamp(15px, 4vh, 30px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: clamp(10px, 2vh, 15px) clamp(20px, 4vw, 30px);
          border-radius: 25px;
          border: 2px solid rgba(255,255,255,0.3);
          z-index: 200;
          font-size: clamp(0.8rem, 2.5vw, 1rem);
        }
        
        .final-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 15px;
          overflow-y: auto;
        }
        
        .final-message {
          background: rgba(255,20,147,0.3);
          border: 3px solid rgba(255,255,255,0.5);
          border-radius: 30px;
          padding: clamp(25px, 5vh, 50px);
          text-align: center;
          max-width: 800px;
          width: 100%;
          backdrop-filter: blur(15px);
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .final-title {
          color: white;
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: bold;
          margin-bottom: clamp(20px, 4vh, 30px);
          text-shadow: 0 0 20px rgba(255,255,255,0.8);
        }
        
        .final-text p {
          color: white;
          font-size: clamp(1rem, 2.8vw, 1.2rem);
          line-height: 1.6;
          margin-bottom: clamp(15px, 3vh, 20px);
          text-align: left;
        }
        
        .special-message {
          color: white;
          font-size: clamp(1.1rem, 3vw, 1.3rem);
          margin: clamp(20px, 4vh, 25px) 0;
          text-align: center;
        }
        
        .love-declaration {
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: bold;
          color: #FF1493;
          margin: clamp(20px, 4vh, 30px) 0;
          text-shadow: 0 0 20px #FF1493;
        }
        
        .final-note {
          color: white;
          font-size: clamp(1rem, 2.8vw, 1.2rem);
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .final-message {
            margin: 20px 0;
          }
          
          .final-text p {
            text-align: center;
          }
        }
        
        @media (max-width: 480px) {
          .planet-name {
            display: none;
          }
          
          .game-title {
            top: 10px;
          }
          
          .progress-indicator {
            bottom: 10px;
            font-size: 0.7rem;
            padding: 8px 15px;
          }
        }
      `}</style>
    </>
  );
};

export default ConstellationGame;
