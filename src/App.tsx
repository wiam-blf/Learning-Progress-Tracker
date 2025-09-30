import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Target, CheckCircle2, Circle, ArrowLeft, Trophy, TrendingUp, Play, ExternalLink } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  videoUrl?: string;
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  steps: Step[];
}

const roadmaps: Roadmap[] = [
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Master the fundamentals of ML algorithms and applications',
    icon: <Brain className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    steps: [
      {
        id: 'ml-1',
        title: 'Mathematics Foundations',
        description: 'Linear algebra, calculus, statistics, and probability',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=fNk_zzaMoSs'
      },
      {
        id: 'ml-2',
        title: 'Python Programming',
        description: 'Learn Python basics and data manipulation with pandas/numpy',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw'
      },
      {
        id: 'ml-3',
        title: 'Data Preprocessing',
        description: 'Data cleaning, feature engineering, and exploratory data analysis',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=0xVqLJe9_CY'
      },
      {
        id: 'ml-4',
        title: 'Supervised Learning',
        description: 'Linear regression, logistic regression, decision trees, SVM',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk'
      },
      {
        id: 'ml-5',
        title: 'Unsupervised Learning',
        description: 'K-means clustering, hierarchical clustering, PCA',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=IhVIJmu0des'
      },
      {
        id: 'ml-6',
        title: 'Model Evaluation',
        description: 'Cross-validation, metrics, hyperparameter tuning',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=fSytzGwwBVw'
      },
      {
        id: 'ml-7',
        title: 'Ensemble Methods',
        description: 'Random forests, gradient boosting, bagging',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=3kYujfDgmNk'
      },
      {
        id: 'ml-8',
        title: 'Real-world Projects',
        description: 'Build and deploy ML models for practical applications',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=NWONeJKn6kc'
      }
    ]
  },
  {
    id: 'dl',
    title: 'Deep Learning',
    description: 'Dive deep into neural networks and advanced AI techniques',
    icon: <Target className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    steps: [
      {
        id: 'dl-1',
        title: 'Neural Network Basics',
        description: 'Perceptrons, feedforward networks, backpropagation',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk'
      },
      {
        id: 'dl-2',
        title: 'Deep Learning Frameworks',
        description: 'TensorFlow, PyTorch, and Keras fundamentals',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=tPYj3fFJGjk'
      },
      {
        id: 'dl-3',
        title: 'Convolutional Neural Networks',
        description: 'CNNs for image recognition and computer vision',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=FmpDIaiMIeA'
      },
      {
        id: 'dl-4',
        title: 'Recurrent Neural Networks',
        description: 'RNNs, LSTMs, GRUs for sequence modeling',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=WCUNPb-5EYI'
      },
      {
        id: 'dl-5',
        title: 'Advanced Architectures',
        description: 'ResNet, Attention mechanisms, Transformers',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=iDulhoQ2pro'
      },
      {
        id: 'dl-6',
        title: 'Generative Models',
        description: 'GANs, VAEs, and generative AI techniques',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=5WoItGTWV54'
      },
      {
        id: 'dl-7',
        title: 'Transfer Learning',
        description: 'Pre-trained models and fine-tuning strategies',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=BqqfQnyjmgg'
      },
      {
        id: 'dl-8',
        title: 'Production Deployment',
        description: 'Model optimization, serving, and MLOps practices',
        completed: false,
        videoUrl: 'https://www.youtube.com/watch?v=ywIIK9RgdWs'
      }
    ]
  }
];

function App() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [customTopic, setCustomTopic] = useState('');
  const [customSteps, setCustomSteps] = useState<string[]>(['']);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
  }, [progress]);

  const toggleStepCompletion = (stepId: string) => {
    setProgress(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const calculateProgress = (roadmap: Roadmap) => {
    const completedSteps = roadmap.steps.filter(step => progress[step.id]).length;
    return Math.round((completedSteps / roadmap.steps.length) * 100);
  };

  const addCustomStep = () => {
    setCustomSteps([...customSteps, '']);
  };

  const updateCustomStep = (index: number, value: string) => {
    const newSteps = [...customSteps];
    newSteps[index] = value;
    setCustomSteps(newSteps);
  };

  const removeCustomStep = (index: number) => {
    if (customSteps.length > 1) {
      setCustomSteps(customSteps.filter((_, i) => i !== index));
    }
  };

  const createCustomRoadmap = () => {
    if (!customTopic.trim() || customSteps.some(step => !step.trim())) return;

    const customRoadmap: Roadmap = {
      id: 'custom',
      title: customTopic,
      description: 'Your personalized learning journey',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      steps: customSteps.filter(step => step.trim()).map((step, index) => ({
        id: `custom-${index}`,
        title: step,
        description: 'Complete this learning milestone',
        completed: false
      }))
    };

    setSelectedRoadmap(customRoadmap);
    setShowCustomForm(false);
  };

  if (showCustomForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setShowCustomForm(false)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Learning Paths
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Custom Learning Path</h2>
              <p className="text-gray-600">Design your own personalized roadmap for any topic you want to master.</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to learn?
              </label>
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g., Web Development, Data Science, Photography..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Learning Steps
              </label>
              {customSteps.map((step, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => updateCustomStep(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {customSteps.length > 1 && (
                    <button
                      onClick={() => removeCustomStep(index)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addCustomStep}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                + Add Step
              </button>
            </div>

            <button
              onClick={createCustomRoadmap}
              disabled={!customTopic.trim() || customSteps.some(step => !step.trim())}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Learning Path
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedRoadmap) {
    const progressPercentage = calculateProgress(selectedRoadmap);
    const completedSteps = selectedRoadmap.steps.filter(step => progress[step.id]).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedRoadmap(null)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Learning Paths
          </button>

          {/* Progress Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Here is your roadmap.</h2>
              <p className="text-gray-600">Each step is carefully structured to guide you from beginner to advanced. Follow the sequence to make steady progress.</p>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${selectedRoadmap.color} rounded-2xl flex items-center justify-center text-white mr-4`}>
                  {selectedRoadmap.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{selectedRoadmap.title}</h1>
                  <p className="text-gray-600">{selectedRoadmap.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-2xl font-bold text-gray-800 mb-1">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                  {progressPercentage}%
                </div>
                <p className="text-sm text-gray-600">
                  {completedSteps} of {selectedRoadmap.steps.length} completed
                </p>
              </div>
            </div>

            {/* Progress Dashboard */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Here is your progress dashboard:</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700">You are {progressPercentage}% complete</span>
                <span className="text-sm text-gray-600">{completedSteps} completed • {selectedRoadmap.steps.length - completedSteps} remaining</span>
              </div>
              <p className="text-sm text-gray-600">A clear view of your advancement to keep you motivated.</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className={`bg-gradient-to-r ${selectedRoadmap.color} h-3 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {progressPercentage === 100 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 flex items-center">
                <Trophy className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-800">Congratulations!</h3>
                  <p className="text-green-700 text-sm">You have completed your {selectedRoadmap.title} learning journey! You can return anytime to review or start a new path.</p>
                </div>
              </div>
            )}
          </div>

          {/* Track Progress Instructions */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center mb-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Track Your Progress</h3>
            </div>
            <p className="text-gray-600">Whenever you finish a step, simply check it off. Your progress will update instantly, showing you how far you have come.</p>
          </div>

          {/* Steps List */}
          <div className="space-y-4">
            {selectedRoadmap.steps.map((step, index) => {
              const isCompleted = progress[step.id];
              return (
                <div
                  key={step.id}
                  className={`bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg ${
                    isCompleted ? 'ring-2 ring-green-200 bg-green-50' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <button
                      onClick={() => toggleStepCompletion(step.id)}
                      className="mr-4 mt-1 transition-all duration-200 hover:scale-110"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 mr-3">
                          Step {index + 1}
                        </span>
                        {isCompleted && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${isCompleted ? 'text-green-800' : 'text-gray-800'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                      {step.videoUrl && (
                        <div className="mt-3">
                          <a
                            href={step.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Watch recommended video
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Learning Progress Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Welcome to your personal Learning Tracker. Ready to start your journey?
          </p>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Choose what you want to learn from the options below.
          </p>
        </div>

        {/* Choose Learning Path Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Select a path to begin:</h2>
          <p className="text-gray-500">Machine Learning, Deep Learning, or create your own custom topic.</p>
        </div>

        {/* Topic Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => {
            const progressPercentage = calculateProgress(roadmap);
            const hasProgress = progressPercentage > 0;

            return (
              <div
                key={roadmap.id}
                onClick={() => setSelectedRoadmap(roadmap)}
                className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${roadmap.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {roadmap.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{roadmap.title}</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{roadmap.description}</p>
                
                {hasProgress && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-gray-800">{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${roadmap.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {roadmap.steps.length} steps
                </div>
              </div>
            );
          })}

          {/* Custom Topic Card */}
          <div
            onClick={() => setShowCustomForm(true)}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group border-2 border-dashed border-gray-300 hover:border-green-400"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Custom Topic</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Create your own personalized learning roadmap for any topic you want to master
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <Target className="w-4 h-4 mr-2" />
              Design your path
            </div>
          </div>
        </div>

        {/* Continue or Reset Section */}
        <div className="text-center mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Continue Your Journey</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            You can return anytime and continue from where you left off. If you want to start a new journey, 
            simply reset and choose another learning path above. Your progress is automatically saved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;