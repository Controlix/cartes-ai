import React from 'react'
import { translations } from '@/config/translations'
import EditableName from './EditableName'
import { RotateCcw } from 'lucide-react'

interface ScoreHeaderProps {
  team1Score: number
  team2Score: number
  team1Name: string
  team2Name: string
  onTeam1NameChange: (name: string) => void
  onTeam2NameChange: (name: string) => void
  onReset: () => void
}

const ScoreHeader: React.FC<ScoreHeaderProps> = ({
  team1Score,
  team2Score,
  team1Name,
  team2Name,
  onTeam1NameChange,
  onTeam2NameChange,
  onReset,
}) => {
  const team1Leads = team1Score > team2Score
  const team2Leads = team2Score > team1Score

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm p-4 relative">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <div className={`flex flex-col items-center flex-1 transition-all ${team1Leads ? 'scale-110 text-blue-600' : ''}`}>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
            <EditableName 
              defaultName={team1Name} 
              onNameChange={onTeam1NameChange}
              className="text-center min-w-[3ch]"
            />
            {team1Leads && <span>👑</span>}
          </div>
          <span className="text-3xl font-bold">{team1Score}</span>
        </div>
        
        <div className="text-gray-300 font-light mx-4 text-xl">{translations.header.vs}</div>
        
        <div className={`flex flex-col items-center flex-1 transition-all ${team2Leads ? 'scale-110 text-red-600' : ''}`}>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
            {team2Leads && <span>👑</span>}
            <EditableName 
              defaultName={team2Name} 
              onNameChange={onTeam2NameChange}
              className="text-center min-w-[3ch]"
            />
          </div>
          <span className="text-3xl font-bold">{team2Score}</span>
        </div>
      </div>

      <button 
        onClick={onReset}
        aria-label={translations.game.newGameButton}
        className="absolute top-1/2 -translate-y-1/2 right-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
      >
        <RotateCcw size={20} />
      </button>
    </header>
  )
}

export default ScoreHeader
