import React, { useState } from 'react'
import { translations } from '@/config/translations'

interface RoundInputFormProps {
  onSubmit: (score1: number, score2: number, taker: 'team1' | 'team2') => void
  disabled?: boolean
  team1Name?: string
  team2Name?: string
}

const RoundInputForm: React.FC<RoundInputFormProps> = ({ 
  onSubmit, 
  disabled = false,
  team1Name = 'Wij',
  team2Name = 'Zij' 
}) => {
  const [score1, setScore1] = useState<string>('')
  const [score2, setScore2] = useState<string>('')
  const [taker, setTaker] = useState<'team1' | 'team2'>('team1')
  const [error, setError] = useState<string>('')

  const handleScoreChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled) return
    
    const s1 = parseInt(score1) || 0
    const s2 = parseInt(score2) || 0

    if (s1 < 0 || s2 < 0) {
      setError(translations.roundInput.errorNegative)
      return
    }

    const sum = s1 + s2
    
    // Valid scenario:
    // 1. Normal round: Sum is exactly 162
    // (Capot 252 is handled automatically by engine when one team has 162)
    const isNormalRound = sum === 162

    if (!isNormalRound) {
      setError(translations.roundInput.errorInvalidSum)
      return
    }

    setError('')
    onSubmit(s1, s2, taker)
    setScore1('')
    setScore2('')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mt-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100" aria-labelledby="form-title">
      <h3 id="form-title" className="text-center text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">{translations.roundInput.title}</h3>
      
      {/* Taker Selection */}
      <div className="flex justify-center gap-4 mb-6">
        <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
          taker === 'team1' 
            ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
            : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
        }`}>
          <input 
            type="radio" 
            name="taker" 
            value="team1" 
            checked={taker === 'team1'} 
            onChange={() => setTaker('team1')}
            disabled={disabled}
            className="hidden"
          />
          <span className="text-xs uppercase font-medium text-gray-400">Preneur:</span>
          <span>{team1Name}</span>
        </label>

        <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
          taker === 'team2' 
            ? 'bg-red-50 border-red-200 text-red-700 font-bold' 
            : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
        }`}>
          <input 
            type="radio" 
            name="taker" 
            value="team2" 
            checked={taker === 'team2'} 
            onChange={() => setTaker('team2')}
            disabled={disabled}
            className="hidden"
          />
          <span className="text-xs uppercase font-medium text-gray-400">Preneur:</span>
          <span>{team2Name}</span>
        </label>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="number"
            pattern="\d*"
            value={score1}
            onChange={handleScoreChange(setScore1)}
            className="w-full text-center text-2xl font-bold p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none transition-colors placeholder-gray-200 disabled:opacity-30"
            placeholder={translations.roundInput.placeholder}
            role="spinbutton"
            aria-label={translations.roundInput.team1Label}
            disabled={disabled}
          />
        </div>
        <div className="flex-1">
          <input
            type="number"
            pattern="\d*"
            value={score2}
            onChange={handleScoreChange(setScore2)}
            className="w-full text-center text-2xl font-bold p-2 border-b-2 border-gray-200 focus:border-red-500 outline-none transition-colors placeholder-gray-200 disabled:opacity-30"
            placeholder={translations.roundInput.placeholder}
            role="spinbutton"
            aria-label={translations.roundInput.team2Label}
            disabled={disabled}
          />
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 text-sm font-medium text-center mb-4 bg-red-50 p-2 rounded animate-pulse">
          {error}
        </div>
      )}
      
      <button 
        type="submit"
        disabled={disabled}
        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {translations.roundInput.submitButton}
      </button>
    </form>
  )
}

export default RoundInputForm