'use client'

import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"
import { useUser } from "@clerk/nextjs"
import Header from "../Components/Header"

interface Goal {
  id: string
  title: string
  description: string
  steps: string
  deadline: string
  progress: number
  accountability: string
  createdAt: Date
}

export default function GoalSettingPage() {
  const { user } = useUser()
  const [goals, setGoals] = useState<Goal[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps: '',
    deadline: '',
    progress: 0,
    accountability: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      progress: parseInt(e.target.value)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newGoal: Goal = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date()
    }
    setGoals(prev => [...prev, newGoal])
    setFormData({
      title: '',
      description: '',
      steps: '',
      deadline: '',
      progress: 0,
      accountability: ''
    })
    setShowForm(false)
  }

  const completedGoals = goals.filter(goal => goal.progress === 100).length
  const totalGoals = goals.length
  const successRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0

  return (
    <div className="min-h-screen bg-black-300 from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <SignedIn>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Your Goals Dashboard</h1>
            <p className="text-slate-300 text-lg">
              Transform your dreams into actionable plans, {user?.firstName || 'User'}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🏆</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{completedGoals}</h3>
                  <p className="text-yellow-200">Completed Goals</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{totalGoals}</h3>
                  <p className="text-blue-200">Total Goals</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">⭐</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{successRate}%</h3>
                  <p className="text-purple-200">Success Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add Goal Button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-white">Your Goals</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <span>+</span>
              Add Goal
            </button>
          </div>

          {/* Goals List */}
          {goals.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Ready to Set Your First Goal?</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Every journey begins with a single step. Click "Add Goal" to start turning your dreams into reality.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors duration-200"
              >
                Create Your First Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <div key={goal.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{goal.title}</h3>
                  <p className="text-slate-300 mb-4 line-clamp-3">{goal.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-400">
                    <p><strong>Deadline:</strong> {goal.deadline}</p>
                    <p><strong>Accountability:</strong> {goal.accountability}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Goal Creation Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-white">Create New Goal</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-slate-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Goal Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                      placeholder="Enter your goal title..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Why This Goal Matters</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                      placeholder="Describe why this goal is important to you..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Steps & Actions</label>
                    <textarea
                      name="steps"
                      value={formData.steps}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                      placeholder="List the specific steps you'll take to achieve this goal..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Progress ({formData.progress}%)</label>
                    <input
                      type="range"
                      name="progress"
                      value={formData.progress}
                      onChange={handleProgressChange}
                      min="0"
                      max="100"
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Accountability Partner/System</label>
                    <input
                      type="text"
                      name="accountability"
                      value={formData.accountability}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                      placeholder="Who will help keep you accountable?"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Create Goal
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-2xl font-semibold text-white mb-4">Sign in to access your goals</h2>
            <p className="text-slate-400 mb-8">Create and track your personal goals with our goal-setting platform.</p>
            <SignInButton />
          </div>
        </SignedOut>
      </main>
    </div>
  )
}
