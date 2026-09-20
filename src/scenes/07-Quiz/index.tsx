import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { config } from '../../data/config';
import { Check, X, ArrowRight } from 'lucide-react';

export const Quiz = () => {
  const { setScene } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = config.quiz[currentIndex];

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // Prevent multiple clicks

    setSelectedOption(index);
    setShowFeedback(true);

    const isCorrect = index === currentQuestion.correctAnswerIndex;
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      if (currentIndex < config.quiz.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setIsFinished(true);
      }
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-background px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,240,0.03)_0%,transparent_80%)]" />

      <div className="relative z-10 w-full max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={`q-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col"
            >
              <div className="text-center mb-12">
                <p className="font-sans text-[10px] text-champagne/50 uppercase tracking-[0.4em] mb-4">
                  Question {currentIndex + 1} of {config.quiz.length}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-ivory leading-snug">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;
                  
                  let optionClass = "bg-white/5 border-white/10 text-ivory/80 hover:bg-white/10 hover:border-white/30";
                  
                  if (showFeedback) {
                    if (isSelected && isCorrectAnswer) {
                      optionClass = "bg-green-500/20 border-green-500/50 text-green-100";
                    } else if (isSelected && !isCorrectAnswer) {
                      optionClass = "bg-red-500/20 border-red-500/50 text-red-100";
                    } else if (!isSelected && isCorrectAnswer) {
                      optionClass = "bg-white/5 border-green-500/30 text-green-100/50";
                    } else {
                      optionClass = "bg-transparent border-white/5 text-ivory/30 opacity-50";
                    }
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={selectedOption === null ? { scale: 1.01 } : {}}
                      whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                      onClick={() => handleOptionClick(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full p-4 md:p-6 rounded-xl border text-left flex items-center justify-between transition-all duration-300 glass-panel ${optionClass}`}
                    >
                      <span className="font-sans text-sm md:text-base">{option}</span>
                      {showFeedback && isSelected && isCorrectAnswer && <Check size={18} className="text-green-400" />}
                      {showFeedback && isSelected && !isCorrectAnswer && <X size={18} className="text-red-400" />}
                    </motion.button>
                  );
                })}
              </div>

              <div className="h-16 mt-8 flex items-center justify-center">
                <AnimatePresence>
                  {showFeedback && selectedOption !== currentQuestion.correctAnswerIndex && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-serif italic text-accent/90 text-center text-lg"
                    >
                      {currentQuestion.wrongResponse}
                    </motion.p>
                  )}
                  {showFeedback && selectedOption === currentQuestion.correctAnswerIndex && (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-serif italic text-champagne text-glow text-center text-lg"
                    >
                      Of course you knew that. ✨
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center flex flex-col items-center"
            >
              <p className="font-sans text-[10px] text-champagne/50 uppercase tracking-[0.4em] mb-4">
                Final Score
              </p>
              <h2 className="font-serif text-6xl text-ivory mb-6">
                {score} <span className="text-3xl text-ivory/30">/ {config.quiz.length}</span>
              </h2>
              
              <p className="font-serif text-xl italic text-ivory/70 mb-12">
                {score === config.quiz.length 
                  ? "Okay... you actually know us." 
                  : "Not bad, but I still love you."}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScene('letter')}
                className="px-8 py-3 rounded-full border border-champagne/40 text-champagne text-xs tracking-widest uppercase flex items-center gap-4 hover:bg-champagne/10 transition-colors glass-panel"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
