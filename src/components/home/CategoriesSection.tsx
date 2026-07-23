"use client";
import { motion } from "framer-motion";
import { PenTool, Code, Palette, Megaphone, Zap, Search, Video, Music } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export function CategoriesSection() {
  const categories = [
    { name: "Writing", icon: PenTool, count: "120+" },
    { name: "Coding", icon: Code, count: "85+" },
    { name: "Design", icon: Palette, count: "140+" },
    { name: "Marketing", icon: Megaphone, count: "95+" },
    { name: "Productivity", icon: Zap, count: "110+" },
    { name: "Research", icon: Search, count: "45+" },
    { name: "Video", icon: Video, count: "60+" },
    { name: "Music", icon: Music, count: "30+" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted max-w-2xl mx-auto">Find exactly what you need across our organized categories of AI tools.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={`/tools?category=${cat.name}`}>
                  <Card className="p-6 flex flex-col items-center text-center hover:bg-surface-hover hover:border-primary/50 cursor-pointer">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-1">{cat.name}</h3>
                    <p className="text-xs text-muted">{cat.count} tools</p>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}