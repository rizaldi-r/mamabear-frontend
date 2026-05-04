'use client';

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react"; 

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft ] = useState<TimeLeft>(calculateTimeLeft(targetDate))
  const [ isFinished, setIsFinished ] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(targetDate)
      setTimeLeft(remaining)

      if (Object.values(remaining).every(value => value === 0)) {
        setIsFinished(true)
        clearInterval(timer)
      }
    }, 1000)
    
    return () => clearInterval(timer) // clean up the timer on component unmount
  }, [targetDate])

  if (isFinished) return <p>Waktu habis</p>

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-4 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col">
          <span className="text-font-6 font-bold">{String(value).padStart(2, '0')}</span>
          <span className="text-sm capitalize">{unit}</span>
        </div>
      ))}
  </div>
  )
}

export function RoadToSale() {
  const targetDate = new Date('2026-05-05T00:00:00+07:00')

  return (
    <section className="bg-[--mama-cream] py-3 md:py-6 border-y border-pink-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center md:justify-between max-w-4xl gap-2 md:gap-4">
        <div className="text-center md:text-left">
          <h2 
            className="font-bold text-[var(--mama-brown)] text-font-3 md:text-font-6 stroke-1" 
          >
            ROAD TO 5.5 SALE
          </h2>
          <Button
            variant="link"
            className="text-destructive text-font-1 md:text-font-4 font-bold p-0 h-auto stroke-1 hover:no-underline"
            style={{ color: '#F21D04' }}
          >
            KLAIM VOUCHERNYA &gt;
          </Button>
        </div>
        <div className="hidden md:flex gap-4">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
    </section>
  );
}
