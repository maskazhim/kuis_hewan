
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ANIMALS, UI_STRINGS, API_URL } from './constants';
import { AnimalType, AnimalDiet, AnimalData } from './types';
import { playClickSound, playSuccessSound, playErrorSound, playMilestoneSound } from './utils/soundEffects';
import AdminPanel from './components/AdminPanel';

type QuizType = 'EMOJI_TO_TEXT' | 'TEXT_TO_EMOJI' | 'COMPLETE_NAME' | 'DIET_QUIZ' | 'ANIMAL_TYPE';
type Language = 'id' | 'en' | 'zh';
type AppView = 'LOGIN' | 'GAME' | 'ADMIN'; 

const ADMIN_PASSWORD = "MainAR2026";
const QUIZ_TIMEOUT = 10; // 10 seconds limit

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('LOGIN');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAdminLogin, setIsAdminLogin] = useState<boolean>(false);
  const [inputCode, setInputCode] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validCodes, setValidCodes] = useState<string[]>([]);
  const [language, setLanguage] = useState<Language>('id');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false);

  // Free Trial States
  const [isFreeTrial, setIsFreeTrial] = useState<boolean>(false);
  const [freeTrialCount, setFreeTrialCount] = useState<number>(0);
  const [trialSessionsUsed, setTrialSessionsUsed] = useState<number>(0);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);

  // Quiz states
  const [quizQueue, setQuizQueue] = useState<number[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'timeout' | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIMEOUT);
  
  const t = UI_STRINGS[language];

  const handleLanguageSelect = (lang: Language) => {
    playClickSound();
    setLanguage(lang);
    setIsLangMenuOpen(false);
    localStorage.setItem('zoo_lang', lang);
  };

  const getMaskedName = (name: string) => {
    const vowels = "AIUEO";
    return name.split('').map(char => {
      if (vowels.includes(char.toUpperCase())) return "_";
      if (char === " " || char === "-") return char;
      return char;
    }).join(' ');
  };

  const generateNewQueue = useCallback(() => {
    const indices = Array.from(ANIMALS.keys());
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, []);

  // Timer Effect
  useEffect(() => {
    let timer: any;
    if (view === 'GAME' && !feedback && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !feedback) {
      handleTimeout();
    }
    return () => clearInterval(timer);
  }, [timeLeft, feedback, view]);

  useEffect(() => {
    setQuizQueue(generateNewQueue());
    const savedAuth = localStorage.getItem('zoo_auth');
    const savedAdmin = localStorage.getItem('zoo_admin');
    const savedBestStreak = localStorage.getItem('zoo_best_streak');
    const savedTotalCorrect = localStorage.getItem('zoo_total_correct');
    const savedLang = localStorage.getItem('zoo_lang') as Language;
    const savedTrialSessions = localStorage.getItem('zoo_trial_sessions');

    if (savedLang) setLanguage(savedLang);
    if (savedTrialSessions) setTrialSessionsUsed(parseInt(savedTrialSessions, 10));

    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      if (savedAdmin === 'true') {
        setIsAdmin(true);
        setView('ADMIN'); // Admin goes to panel by default if saved
      } else {
        setView('GAME');
      }
    }
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
    if (savedTotalCorrect) setTotalCorrect(parseInt(savedTotalCorrect, 10));

    const fetchCodes = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (Array.isArray(data)) {
          const codes = data.map(item => typeof item === 'object' ? item.code : item);
          setValidCodes(codes.map(c => c.toString().toUpperCase()));
        }
      } catch (err) {
        // Fallback offline
        setValidCodes(["WAHIB", "1234", "KIDS", "GURU", "ZOO"]);
      }
    };
    fetchCodes();
  }, [generateNewQueue]);

  // Fungsi untuk update penggunaan kode ke Google Sheet
  const trackUsage = async (code: string) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'increment_usage',
          code: code
        })
      });
    } catch (e) {
      console.error("Gagal tracking usage", e);
    }
  };

  const handleFreeTrialStart = () => {
    if (trialSessionsUsed >= 2) return;

    playClickSound();
    
    // Increment trial session usage
    const newSessionCount = trialSessionsUsed + 1;
    setTrialSessionsUsed(newSessionCount);
    localStorage.setItem('zoo_trial_sessions', newSessionCount.toString());

    setIsFreeTrial(true);
    setFreeTrialCount(0);
    setView('GAME');
    setShowBuyModal(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (isAdminLogin) {
        // Admin login is case-sensitive now based on "MainAR2026"
        if (inputCode === ADMIN_PASSWORD) {
          playSuccessSound();
          setIsAuthenticated(true);
          setIsAdmin(true);
          setView('ADMIN');
          localStorage.setItem('zoo_auth', 'true');
          localStorage.setItem('zoo_admin', 'true');
        } else {
          playErrorSound();
          setLoginError(true);
          setTimeout(() => setLoginError(false), 2000);
        }
      } else {
        const upperInput = inputCode.toUpperCase();
        // Backdoor check for testing (optional, keeping logic similar but separated)
        if (inputCode === ADMIN_PASSWORD) {
           playSuccessSound();
           setIsAuthenticated(true);
           setIsAdmin(true);
           setView('ADMIN');
           localStorage.setItem('zoo_auth', 'true');
           localStorage.setItem('zoo_admin', 'true');
        } else if (validCodes.includes(upperInput)) {
          playSuccessSound();
          setIsAuthenticated(true);
          setIsAdmin(false);
          setIsFreeTrial(false); // Ensure not free trial
          setView('GAME');
          localStorage.setItem('zoo_auth', 'true');
          localStorage.setItem('zoo_admin', 'false');
          // Track usage for student login
          trackUsage(upperInput);
        } else {
          playErrorSound();
          setLoginError(true);
          setTimeout(() => setLoginError(false), 2000);
        }
      }
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    playClickSound();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsFreeTrial(false);
    setFreeTrialCount(0);
    setShowBuyModal(false);
    setView('LOGIN');
    setInputCode('');
    setStreak(0);
    localStorage.removeItem('zoo_auth');
    localStorage.removeItem('zoo_admin');
  };

  const handleRestart = () => {
    playClickSound();
    setFeedback(null);
    setStreak(0);
    setTimeLeft(QUIZ_TIMEOUT);
    setQuizQueue(generateNewQueue());
    setCurrentQueueIndex(0);
  }

  const currentQuiz = useMemo(() => {
    if (quizQueue.length === 0) return null;
    const animalIndex = quizQueue[currentQueueIndex % quizQueue.length];
    const animal = ANIMALS[animalIndex];
    
    const cycle = currentQueueIndex % 5;
    const types: QuizType[] = ['EMOJI_TO_TEXT', 'TEXT_TO_EMOJI', 'COMPLETE_NAME', 'DIET_QUIZ', 'ANIMAL_TYPE'];
    const type = types[cycle];

    let options;
    if (type === 'DIET_QUIZ') {
      options = [
        { id: 'HERBIVORA', name: t.diets.HERBIVORA, emoji: '🌿' },
        { id: 'KARNIVORA', name: t.diets.KARNIVORA, emoji: '🍖' },
        { id: 'OMNIVORA', name: t.diets.OMNIVORA, emoji: '🥗' }
      ];
    } else if (type === 'ANIMAL_TYPE') {
      options = [
        { id: 'MAMALIA', name: t.types.MAMALIA, emoji: '🤱' },
        { id: 'BURUNG', name: t.types.BURUNG, emoji: '🪶' },
        { id: 'REPTIL', name: t.types.REPTIL, emoji: '🦎' },
        { id: 'IKAN', name: t.types.IKAN, emoji: '🌊' }
      ];
      if (!options.find(o => o.id === animal.type)) {
        options[3] = { id: animal.type as string, name: (t.types as any)[animal.type as string], emoji: '🐾' };
      }
      options.sort(() => Math.random() - 0.5);
    } else {
      const otherAnimals = ANIMALS.filter(a => a.id !== animal.id);
      const shuffledOthers = [...otherAnimals].sort(() => Math.random() - 0.5);
      options = [animal, ...shuffledOthers.slice(0, 3)].sort(() => Math.random() - 0.5);
    }
    
    return { animal, options, type };
  }, [quizQueue, currentQueueIndex, language, t]);

  const handleTimeout = () => {
    playErrorSound();
    setStreak(0);
    setFeedback('timeout');
    // Note: Timeout now stays until user clicks restart
  };

  const handleAnswer = (selectedId: string) => {
    if (feedback) return;
    
    let isCorrect = false;
    if (currentQuiz?.type === 'DIET_QUIZ') isCorrect = selectedId === currentQuiz.animal.diet;
    else if (currentQuiz?.type === 'ANIMAL_TYPE') isCorrect = selectedId === currentQuiz.animal.type;
    else isCorrect = selectedId === currentQuiz?.animal.id;

    if (isCorrect) {
      const newStreak = streak + 1;
      const newTotal = totalCorrect + 1;
      
      if (newStreak > 0 && newStreak % 10 === 0) {
        const tier = Math.min(Math.floor(newStreak / 10), 5);
        playMilestoneSound(tier);
      } else {
        playSuccessSound();
      }

      setStreak(newStreak);
      setTotalCorrect(newTotal);
      localStorage.setItem('zoo_total_correct', newTotal.toString());
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        localStorage.setItem('zoo_best_streak', newStreak.toString());
      }
      setFeedback('correct');
    } else {
      playErrorSound();
      setStreak(0);
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
      setTimeLeft(QUIZ_TIMEOUT); 
    }
  };

  const nextQuiz = () => {
    playClickSound();

    // Check Free Trial Limit
    if (isFreeTrial) {
      const nextCount = freeTrialCount + 1;
      setFreeTrialCount(nextCount);
      if (nextCount >= 3) {
        setShowBuyModal(true);
        setFeedback(null); // Clear feedback to show modal clearly
        return; // Stop here
      }
    }

    setFeedback(null);
    setTimeLeft(QUIZ_TIMEOUT);
    const nextIdx = currentQueueIndex + 1;
    if (nextIdx >= quizQueue.length) {
      setQuizQueue(generateNewQueue());
      setCurrentQueueIndex(0);
    } else {
      setCurrentQueueIndex(nextIdx);
    }
  };

  const isMilestone = streak > 0 && streak % 10 === 0;
  const milestoneTier = isMilestone ? Math.min(Math.floor(streak / 10), 5) : 0;
  const showFact = totalCorrect > 0 && totalCorrect % 5 === 0;
  
  // Calculate Level based on total correct answers
  const currentLevel = Math.floor(totalCorrect / 10) + 1;

  // Render Admin View
  if (view === 'ADMIN' && isAuthenticated && isAdmin) {
    return <AdminPanel onLogout={handleLogout} />;
  }

  // Login View
  if (view === 'LOGIN') {
    return (
      <div className="h-screen w-full bg-gradient-to-b from-[#FFF9E6] to-[#E6F4FF] flex flex-col items-center justify-center p-6 select-none relative overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl opacity-20 rotate-12 animate-bounce duration-[3000ms]">🦁</div>
        <div className="absolute top-20 right-10 text-6xl opacity-20 -rotate-12 animate-bounce duration-[4000ms]">🦒</div>
        <div className="absolute bottom-40 left-5 text-6xl opacity-20 rotate-45">🐘</div>
        <div className="absolute bottom-20 right-5 text-6xl opacity-20 -rotate-45">🦓</div>

        <div className="w-full max-sm bg-white rounded-[4rem] shadow-2xl p-8 border-[12px] border-white flex flex-col items-center z-10 relative">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-5xl shadow-inner mb-4 -mt-16 border-8 border-white">
            {isAdminLogin ? '🔐' : '🐾'}
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-orange-500 tracking-tighter leading-tight drop-shadow-sm uppercase">
              {isAdminLogin ? t.login.adminTitle : t.login.welcome}
            </h1>
            {!isAdminLogin && <p className="text-blue-400 font-bold text-sm mt-1">{t.login.subtitle}</p>}
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            <input 
              type={isAdminLogin ? "password" : "text"}
              placeholder={isAdminLogin ? t.login.adminPlaceholder : t.login.placeholder}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className={`w-full py-4 px-6 rounded-[2rem] bg-stone-50 border-4 text-center text-xl font-black transition-all focus:outline-none focus:border-yellow-400 text-black ${!isAdminLogin ? 'uppercase' : ''} ${loginError ? 'border-red-400 animate-shake' : 'border-stone-100'}`}
            />
            {loginError && <p className="text-red-500 font-bold text-center text-sm">{isAdminLogin ? t.login.adminError : t.login.error}</p>}
            <button type="submit" className="w-full py-4 bg-orange-500 text-white rounded-[2.5rem] font-black text-xl shadow-[0_8px_0_rgb(234,88,12)] active:translate-y-1 active:shadow-none transition-all">
              {isLoading ? '...' : (isAdminLogin ? t.login.adminButton : t.login.button)}
            </button>
            
            {/* Free Trial Button - Only on Student Login */}
            {!isAdminLogin && (
              <button 
                type="button" 
                onClick={handleFreeTrialStart}
                disabled={trialSessionsUsed >= 2}
                className={`w-full py-4 rounded-[2.5rem] font-black text-xl shadow-[0_8px_0_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none transition-all mt-2 ${
                  trialSessionsUsed >= 2 
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none' 
                    : 'bg-green-500 text-white shadow-[0_8px_0_rgb(22,163,74)]'
                }`}
              >
                {trialSessionsUsed >= 2 ? t.login.freeTrialLimit : t.login.freeTrialButton}
              </button>
            )}

            <button type="button" onClick={() => { setIsAdminLogin(!isAdminLogin); setInputCode(''); setLoginError(false); }} className="w-full text-stone-400 font-bold text-[10px] uppercase mt-4 tracking-widest">
              {isAdminLogin ? t.login.switchUser : t.login.switchAdmin}
            </button>
          </form>
        </div>
        <LanguageSelector currentLanguage={language} isOpen={isLangMenuOpen} onToggle={() => setIsLangMenuOpen(!isLangMenuOpen)} onSelect={handleLanguageSelect} />
      </div>
    );
  }

  const getMilestoneTheme = (tier: number) => {
    switch(tier) {
      case 1: return { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200' };
      case 2: return { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200' };
      case 3: return { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-200' };
      case 4: return { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-200' };
      case 5: return { bg: 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500', text: 'text-orange-600', border: 'border-orange-200' };
      default: return { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200' };
    }
  };

  const theme = getMilestoneTheme(milestoneTier);

  // Main Game View
  return (
    <div className="h-screen w-full bg-[#FFF4F4] flex flex-col overflow-hidden select-none relative font-sans">
      
      {/* Full Screen Timeout Overlay */}
      {feedback === 'timeout' && (
         <div className="fixed inset-0 z-[100] bg-red-500 flex flex-col items-center justify-center text-white animate-in zoom-in duration-300 p-8 text-center">
            <div className="text-8xl mb-4 animate-shake">⏰</div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 drop-shadow-md">WAKTU HABIS!</h1>
            <p className="text-red-200 font-bold text-xl mb-12">Jangan menyerah! Coba lagi!</p>
            <button 
              onClick={handleRestart}
              className="px-8 py-6 bg-white text-red-500 rounded-[2rem] font-black text-2xl shadow-[0_10px_0_rgba(0,0,0,0.2)] active:translate-y-2 active:shadow-none transition-all uppercase"
            >
              MULAI LAGI 🔄
            </button>
         </div>
      )}

      {/* Trial Finished Modal */}
      {showBuyModal && (
         <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white rounded-[3rem] p-8 shadow-2xl flex flex-col items-center gap-6 border-8 border-yellow-400 w-full max-w-md text-center animate-in zoom-in duration-300">
             <div className="text-7xl animate-bounce">🎁</div>
             <div>
               <h2 className="text-3xl font-black text-orange-500 uppercase leading-none mb-2">{t.trial.title}</h2>
               <p className="text-stone-600 font-bold text-lg leading-tight">{t.trial.message}</p>
             </div>
             
             <div className="flex flex-col gap-3 w-full">
               <button 
                 onClick={() => window.location.href = 'https://pay.mainar.id/qanimal'}
                 className="w-full py-4 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-2xl font-black text-xl shadow-lg active:scale-95 transition-transform"
               >
                 {t.trial.buy} ➔
               </button>
               <button 
                 onClick={handleLogout}
                 className="w-full py-4 bg-stone-100 text-stone-500 rounded-2xl font-black text-lg active:scale-95 transition-transform border-2 border-stone-200"
               >
                 {t.trial.enterCode}
               </button>
             </div>
           </div>
         </div>
      )}

      {/* Header - Modern Dashboard Style */}
      <header className="w-full max-w-5xl mx-auto p-3 z-50 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border-2 border-stone-100 px-4 py-3 flex flex-row items-center justify-between gap-4">
           {/* Left: Logout & Title */}
           <div className="flex items-center gap-3 md:gap-4">
              <button 
                onClick={handleLogout} 
                className="w-10 h-10 md:w-12 md:h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center font-black text-lg shadow-sm active:scale-95 active:bg-red-100 transition-all border border-red-100 hover:border-red-200"
                title="Logout"
              >
                🔙
              </button>
              <h1 className="text-lg md:text-2xl font-black text-stone-700 tracking-wider uppercase leading-none">
                ANIMAL QUIZ
              </h1>
           </div>

           {/* Right: Stats Grid */}
           <div className="flex items-center gap-2 md:gap-3">

               {/* Timer Badge (New) */}
               <div className={`flex flex-col items-center px-2 md:px-4 py-1.5 rounded-xl border min-w-[50px] md:min-w-[70px] transition-colors duration-300 ${timeLeft <= 2 ? 'bg-red-50 border-red-200 animate-pulse' : 'bg-green-50 border-green-100'}`}>
                 <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-wider ${timeLeft <= 2 ? 'text-red-500' : 'text-green-500'}`}>TIMER</span>
                 <div className="flex items-center gap-1">
                    <span className={`text-base md:text-xl font-black leading-none ${timeLeft <= 2 ? 'text-red-600' : 'text-green-600'}`}>{timeLeft}s</span>
                    <span className="text-[10px] md:text-xs">⏱️</span>
                 </div>
              </div>
              
              {/* Level Badge */}
              <div className="hidden md:flex flex-col items-center bg-blue-50 px-2 md:px-4 py-1.5 rounded-xl border border-blue-100 min-w-[50px] md:min-w-[70px]">
                 <span className="text-[8px] md:text-[10px] text-blue-400 font-bold uppercase tracking-wider">LEVEL</span>
                 <span className="text-base md:text-xl font-black text-blue-600 leading-none">{currentLevel}</span>
              </div>

              {/* Streak Badge */}
              <div className="flex flex-col items-center bg-orange-50 px-2 md:px-4 py-1.5 rounded-xl border border-orange-100 min-w-[50px] md:min-w-[70px]">
                 <span className="text-[8px] md:text-[10px] text-orange-400 font-bold uppercase tracking-wider">STREAK</span>
                 <div className="flex items-center gap-1">
                    <span className="text-base md:text-xl font-black text-orange-600 leading-none">{streak}</span>
                    <span className="text-[10px] md:text-xs">🔥</span>
                 </div>
              </div>

              {/* High Score (Rekor) Badge */}
              <div className="flex flex-col items-center bg-yellow-50 px-2 md:px-4 py-1.5 rounded-xl border border-yellow-100 min-w-[50px] md:min-w-[70px]">
                 <span className="text-[8px] md:text-[10px] text-yellow-500 font-bold uppercase tracking-wider">REKOR</span>
                 <div className="flex items-center gap-1">
                    <span className="text-base md:text-xl font-black text-yellow-600 leading-none">{bestStreak}</span>
                    <span className="text-[10px] md:text-xs">👑</span>
                 </div>
              </div>

           </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 w-full overflow-hidden relative">
        {currentQuiz && (
          <div className="h-full overflow-y-auto flex flex-col items-center p-4 gap-4 animate-in slide-in-from-left duration-300 pb-24">
            
            {/* Feedback Screen (Correct) */}
            {feedback === 'correct' && (
              <div className={`fixed inset-0 flex flex-col items-center justify-center z-[100] animate-in fade-in zoom-in duration-300 ${theme.bg} bg-opacity-95`}>
                {/* Particles */}
                {milestoneTier >= 2 && Array.from({length: milestoneTier * 10}).map((_, i) => (
                  <div key={i} className="absolute text-2xl animate-bounce" style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}>✨</div>
                ))}
                
                <div className="bg-white rounded-[3rem] p-8 shadow-2xl flex flex-col items-center gap-4 border-8 border-white/50 animate-wobble relative w-[90%] max-w-sm max-h-[90vh] overflow-y-auto">
                  
                  {/* Animal Image / Emoji */}
                  <div className="relative group">
                     <span className={`text-[8rem] leading-none transition-transform ${milestoneTier >= 3 ? 'animate-pulse' : ''} block`}>
                        {currentQuiz.animal.emoji}
                     </span>
                  </div>

                  <div className="text-center">
                    <h2 className={`text-4xl font-black leading-tight ${theme.text} uppercase`}>
                      {isMilestone ? t.milestoneMessages[milestoneTier - 1] : t.feedback.correct}
                    </h2>
                    <span className="bg-stone-100 px-3 py-1 rounded-full text-stone-600 font-black text-xs uppercase">{t.streak}: {streak}</span>
                  </div>

                  {showFact && currentQuiz.animal.fact && (
                    <div className="bg-orange-50 p-4 rounded-2xl border-2 border-orange-100 w-full">
                      <h3 className="text-orange-600 font-black text-xs mb-1">💡 {t.funFactTitle}</h3>
                      <p className="text-stone-700 font-bold text-sm leading-tight">{(currentQuiz.animal.fact as any)[language]}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 w-full">
                     <button onClick={nextQuiz} className="flex-1 py-4 bg-stone-900 text-white rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-transform">{t.buttons.next}</button>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-xl border-4 border-white p-6 flex flex-col items-center relative shrink-0">
              <h2 className="text-lg font-black text-stone-700 mb-6 uppercase tracking-tight text-center px-4">
                {currentQuiz.type === 'EMOJI_TO_TEXT' ? t.questionEmoji : 
                 currentQuiz.type === 'TEXT_TO_EMOJI' ? t.questionText : 
                 currentQuiz.type === 'COMPLETE_NAME' ? t.questionComplete : 
                 currentQuiz.type === 'DIET_QUIZ' ? t.questionDiet : 
                 t.questionType}
              </h2>
              <div className="flex flex-col items-center justify-center min-h-[10rem] w-full">
                {['EMOJI_TO_TEXT', 'DIET_QUIZ', 'ANIMAL_TYPE'].includes(currentQuiz.type) && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-[8rem] leading-none animate-in zoom-in duration-500">{currentQuiz.animal.emoji}</div>
                    {['DIET_QUIZ', 'ANIMAL_TYPE'].includes(currentQuiz.type) && <div className="text-xl font-black text-stone-800 uppercase">{(currentQuiz.animal.name as any)[language]}</div>}
                  </div>
                )}
                {currentQuiz.type === 'TEXT_TO_EMOJI' && <div className="text-4xl font-black text-blue-600 text-center uppercase tracking-widest">{(currentQuiz.animal.name as any)[language]}</div>}
                {currentQuiz.type === 'COMPLETE_NAME' && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-[6rem] leading-none">{currentQuiz.animal.emoji}</div>
                    <div className="text-2xl font-black tracking-[0.2em] text-orange-500 bg-stone-50 py-2 px-4 rounded-xl border-4 border-dashed border-stone-200 uppercase">{getMaskedName((currentQuiz.animal.name as any)[language])}</div>
                  </div>
                )}
              </div>
              
              {/* Note: Small popup feedback for WRONG answers only now, Timeout is full screen */}
              {feedback === 'wrong' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full font-black animate-shake shadow-lg z-20 whitespace-nowrap">
                  SALAH!
                </div>
              )}
            </div>

            {currentQuiz.type === 'TEXT_TO_EMOJI' ? (
              <div className="flex flex-row justify-center flex-wrap gap-4 w-full max-w-sm mt-2 pb-8">
                {currentQuiz.options.map((option: any) => (
                  <button 
                    key={option.id} 
                    onClick={() => handleAnswer(option.id)} 
                    className="bg-white border-4 border-stone-100 rounded-3xl w-20 h-20 font-black text-stone-800 flex items-center justify-center active:scale-95 transition-all shadow-sm hover:border-blue-400"
                  >
                    <span className="text-5xl">{option.emoji}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className={`grid ${['DIET_QUIZ', 'ANIMAL_TYPE'].includes(currentQuiz.type) ? 'grid-cols-1' : 'grid-cols-2'} gap-3 w-full max-w-sm mt-2 pb-8`}>
                {currentQuiz.options.map((option: any) => (
                  <button 
                    key={option.id} 
                    onClick={() => handleAnswer(option.id)} 
                    className="bg-white border-4 border-stone-100 rounded-2xl h-16 font-black text-stone-800 flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm hover:border-orange-200 uppercase px-4"
                  >
                    {['DIET_QUIZ', 'ANIMAL_TYPE'].includes(currentQuiz.type) ? <><span className="text-xl">{option.emoji}</span><span>{option.name}</span></> : (option.name as any)[language]}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <LanguageSelector currentLanguage={language} isOpen={isLangMenuOpen} onToggle={() => setIsLangMenuOpen(!isLangMenuOpen)} onSelect={handleLanguageSelect} />
    </div>
  );
};

const LanguageSelector: React.FC<{currentLanguage: Language, isOpen: boolean, onToggle: () => void, onSelect: (lang: Language) => void}> = ({currentLanguage, isOpen, onToggle, onSelect}) => {
  const options: {id: Language, label: string}[] = [{ id: 'id', label: '🇮🇩 ID' }, { id: 'en', label: '🇺🇸 EN' }, { id: 'zh', label: '🇨🇳 ZH' }];
  const currentLabel = options.find(o => o.id === currentLanguage)?.label || 'ID';
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-[200]">
      {isOpen && <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
        {options.map((opt) => (
          <button key={opt.id} onClick={() => onSelect(opt.id)} className={`w-14 h-14 bg-white shadow-xl rounded-full border-4 flex flex-col items-center justify-center text-[10px] font-black transition-all active:scale-90 ${currentLanguage === opt.id ? 'border-orange-500 text-orange-600' : 'border-stone-100 text-stone-400'}`}><span className="text-xl leading-none">{opt.label.split(' ')[0]}</span><span>{opt.label.split(' ')[1]}</span></button>
        ))}
      </div>}
      <button onClick={() => { playClickSound(); onToggle(); }} className={`w-14 h-14 bg-white shadow-2xl rounded-full border-4 border-orange-200 flex flex-col items-center justify-center text-[10px] font-black text-orange-600 active:scale-90 transition-transform ${isOpen ? 'rotate-12' : ''}`}><span className="text-xl leading-none">{currentLabel.split(' ')[0]}</span><span>{currentLabel.split(' ')[1]}</span></button>
    </div>
  );
}

export default App;
