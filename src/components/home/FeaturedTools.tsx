"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { Tool } from "@/types";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ExternalLink, Star } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";

export function FeaturedTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/tools/featured");
        setTools(res.data);
      } catch (error) {
        console.error("Failed to fetch featured tools:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">Featured Tools</h2>
            <p className="text-muted">Discover the most popular AI tools handpicked for you.</p>
          </div>
          <Link href="/tools">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading featured AI tools..." size="lg" />
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tools.map((tool) => (
              <motion.div key={tool._id} variants={item}>
                <Card className="h-full flex flex-col group glass-card">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Cover Thumbnail */}
                    <div className="w-full h-44 relative rounded-xl overflow-hidden mb-4 bg-surface border border-border">
                      <img 
                        src={tool.thumbnail} 
                        alt={tool.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <span className="bg-black/70 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-md border border-white/20 font-bold uppercase tracking-wider shadow-md">
                          {tool.pricing}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{tool.title}</h3>
                      <Badge variant="outline">{tool.category}</Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={tool.avgRating || 5} />
                      <span className="text-xs text-muted font-medium">{tool.avgRating ? tool.avgRating.toFixed(1) : '5.0'}</span>
                    </div>

                    <p className="text-muted text-sm flex-1 mb-6 line-clamp-2">{tool.shortDescription}</p>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                        {tool.pricing}
                      </span>
                      <Link href={`/tools/${tool._id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary font-medium">
                          View Details <ExternalLink className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}