"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

export function TestimonialsSection() {
  const testimonials = [
    { name: "John Doe", role: "Software Engineer", quote: "ToolNest is my go-to place for discovering new coding tools. It saved me hours of research." },
    { name: "Jane Smith", role: "Marketing Manager", quote: "The curated lists and honest reviews help our team pick the best marketing software." },
    { name: "Sam Wilson", role: "Freelance Designer", quote: "I love the detailed comparisons. It's incredibly helpful for finding free alternatives." },
    { name: "Lisa Brown", role: "Product Manager", quote: "ToolNest Pro gives us the insights we need to make informed purchasing decisions." },
    { name: "Tom Holland", role: "Startup Founder", quote: "A must-have resource for any tech founder. Discovered my entire tech stack here." },
    { name: "Alice Green", role: "Content Creator", quote: "The writing tools category is a goldmine. Highly recommend to all creators." },
  ];

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        
        {/* Simple grid for simplicity, instead of a complex carousel */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col">
                <p className="text-muted italic flex-1 mb-6">&quot;{t.quote}&quot;</p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{t.name}</h4>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}