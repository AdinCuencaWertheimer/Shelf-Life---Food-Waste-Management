import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, CheckCircle, Bell, ChefHat, TrendingDown, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface WelcomeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSignUpClick: () => void
}

const slides = [
  {
    title: "Welcome to Shelf Life!",
    subtitle: "Never forget what's in your kitchen",
    content: "Stop throwing away good food! Shelf Life helps you track expiration dates and reduce waste.",
    image: "🍎",
    features: []
  },
  {
    title: "Know Your Kitchen",
    subtitle: "Never Forget What You Have",
    content: "Add all your groceries with their expiration dates.",
    image: "📝",
    features: [
      "Quick add common groceries",
      "Smart expiration date suggestions",
      "Simple, clean interface"
    ]
  },
  {
    title: "Smart Notifications", 
    subtitle: "Stay Ahead of Spoilage",
    content: "Get timely text reminders about groceries expiring soon. Never let food go bad again with our intelligent alert system.",
    image: "🔔",
    features: [
      "Daily text summaries"
    ]
  },
  {
    title: "Recipe Suggestions",
    subtitle: "Turn Expiring Food Into Delicious Meals",
    content: "Get instant recipe ideas based on what's about to expire. Transform potential waste into tasty dishes!",
    image: "👨‍🍳",
    features: [
      "AI-powered recipe matching",
      "Use expiring ingredients first",
      "Reduce food waste effectively"
    ]
  },
  {
    title: "Save Money & Planet",
    subtitle: "Make a Real Impact",
    content: "Join thousands reducing food waste! Save hundreds on groceries while helping the environment. Ready to start your journey?",
    image: "🌱",
    features: []
  }
]

export const WelcomeModal = ({ open, onOpenChange, onSignUpClick }: WelcomeModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Reset to first slide when modal opens
  useEffect(() => {
    if (open) {
      setCurrentSlide(0)
    }
  }, [open])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleGetStarted = () => {
    onOpenChange(false)
    onSignUpClick()
  }

  const handleSkip = () => {
    onOpenChange(false)
    localStorage.setItem('shelf-life-welcomed', 'true')
  }

  const isLastSlide = currentSlide === slides.length - 1
  const slide = slides[currentSlide]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden [&>[data-close]]:text-black dark:[&>[data-close]]:text-black">
        <div className="relative">

          {/* Slide content */}
          <div className="text-center animate-fade-in">
            {/* Slide indicator at top */}
            <div className="flex justify-center space-x-2 mb-8 pt-4">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <div className="px-8 pb-8">
              {/* Image/Icon */}
              <div className="text-6xl mb-4">{slide.image}</div>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
              
              {/* Subtitle */}
              <h3 className="text-lg text-primary font-semibold mb-4">{slide.subtitle}</h3>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">{slide.content}</p>

              {/* Features */}
              {slide.features.length > 0 && (
                <div className="space-y-3 mb-8">
                  {slide.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center space-x-2">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-between">
                {/* Previous button */}
                <Button
                  variant="ghost"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="flex items-center space-x-1"
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </Button>

                {/* Spacer */}
                <div></div>

                {/* Next button */}
                {!isLastSlide && (
                  <Button onClick={nextSlide} className="flex items-center space-x-1">
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-1 bg-gradient-primary"></div>
        </div>
      </DialogContent>
    </Dialog>
  )
}