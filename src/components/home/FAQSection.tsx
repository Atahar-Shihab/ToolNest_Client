"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What is ToolNest?", a: "ToolNest is a comprehensive directory and review platform for AI tools. We help users discover, compare, and review software across various categories like writing, coding, design, and marketing." },
    { q: "How do I submit an AI tool?", a: "To submit a tool, you must create an account and log in. Once logged in, navigate to your Dashboard and click on 'Add Tool'. Fill in the required details and submit. An admin will review it before publishing." },
    { q: "Is ToolNest free to use?", a: "Yes, browsing tools and reading reviews on ToolNest is completely free. We also offer a Pro subscription for advanced insights and premium features." },
    { q: "How are tools reviewed?", a: "Tools are reviewed by our community members. We use a combination of automated checks and manual moderation to ensure reviews are genuine and helpful." },
    { q: "What is ToolNest Pro?", a: "ToolNest Pro is a premium subscription that gives you access to detailed analytics, private tool collections, and ad-free browsing experience." },
    { q: "Can I edit my submitted tools?", a: "Yes, you can edit tools you have submitted from your Dashboard under 'My Tools'." },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="overflow-hidden border border-border">
              <button 
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary/20"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-medium text-foreground">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-muted transition-transform duration-200 ${openIndex === idx ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-4 pt-0 text-muted text-sm border-t border-border mt-2 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}