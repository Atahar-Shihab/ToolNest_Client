"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { label: "AI Tools", value: 500, suffix: "+" },
    { label: "Active Users", value: 10000, suffix: "+" },
    { label: "Reviews", value: 25000, suffix: "+" },
    { label: "Categories", value: 50, suffix: "+" },
  ];

  return (
    <section className="py-20 border-y border-border glass relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className="text-4xl md:text-5xl font-extrabold text-gradient mb-2">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </div>
              <div className="text-sm font-medium text-muted uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}