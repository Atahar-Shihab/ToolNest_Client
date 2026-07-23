"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { StarRating } from "@/components/ui/StarRating";
import { Trophy } from "lucide-react";

export function TopContributors() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Alex Chen", tools: 45, rating: 4.9, avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=random" },
        { id: 2, name: "Sarah Jones", tools: 38, rating: 4.8, avatar: "https://ui-avatars.com/api/?name=Sarah+Jones&background=random" },
        { id: 3, name: "Mike Smith", tools: 32, rating: 4.7, avatar: "https://ui-avatars.com/api/?name=Mike+Smith&background=random" },
        { id: 4, name: "Emma Davis", tools: 29, rating: 4.9, avatar: "https://ui-avatars.com/api/?name=Emma+Davis&background=random" },
        { id: 5, name: "David Kim", tools: 21, rating: 4.6, avatar: "https://ui-avatars.com/api/?name=David+Kim&background=random" },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <section className="py-20 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12 space-x-3">
          <Trophy className="h-8 w-8 text-warning" />
          <h2 className="text-3xl font-bold">Top Contributors</h2>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col space-y-4">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <Card key={i} className="p-4 flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </Card>
            ))
          ) : (
            users.map((u, i) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-4 flex items-center justify-between hover:border-primary/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={u.avatar} alt={u.name} className="h-12 w-12 rounded-full border-2 border-border" />
                      {i < 3 && (
                        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-warning flex items-center justify-center text-xs font-bold text-white shadow-lg border-2 border-surface">
                          {i + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{u.name}</h3>
                      <p className="text-xs text-muted">{u.tools} tools submitted</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-1 mb-1">
                      <StarRating rating={u.rating} maxStars={1} />
                      <span className="font-medium">{u.rating}</span>
                    </div>
                    <p className="text-xs text-muted">Avg. Rating</p>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}