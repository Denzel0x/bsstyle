import { useEffect, useRef, useState } from "react";
import data from "../lib/data.json";

const stats = (data as AboutData).about.stats;

// 1. We dynamically extract the keys from your data.json
// This prevents hardcoded bugs (e.g. if your data uses 'founded' instead of 'clients')
type DynamicStatKey = (typeof stats)[number]["key"];

export const useAboutStatsAnimation = () => {
  const statsSectionRef = useRef<HTMLElement | null>(null);
  
  // 2. Initialize the state dynamically from the data (all starting at 0)
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>(
    () => stats.reduce((acc, item) => ({ ...acc, [item.key]: 0 }), {})
  );
  
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const section = statsSectionRef.current;
    if (!section || hasAnimated) {
      return;
    }

    // 3. Create target object dynamically
    const targets = stats.reduce(
      (acc, item) => {
        acc[item.key] = item.value;
        return acc;
      },
      {} as Record<string, number>
    );

    let rafId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) {
          return;
        }

        const duration = 1600;
        const startTime = performance.now();

        const update = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

          // 4. Update dynamically
          const newStats: Record<string, number> = {};
          Object.keys(targets).forEach((key) => {
            newStats[key] = Math.round(targets[key] * easedProgress);
          });
          
          setAnimatedStats(newStats);

          if (progress < 1) {
            rafId = window.requestAnimationFrame(update);
          } else {
            setHasAnimated(true);
            observer.disconnect();
          }
        };

        rafId = window.requestAnimationFrame(update);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [hasAnimated]);

  return { statsSectionRef, animatedStats };
};