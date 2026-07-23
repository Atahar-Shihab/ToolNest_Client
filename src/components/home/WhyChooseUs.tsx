"use client";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

export function WhyChooseUs() {
  const features = [
    { title: "Curated Collection", desc: "Every tool is verified and reviewed by our community" },
    { title: "Honest Reviews", desc: "Real reviews from real users, no fake ratings" },
    { title: "Free & Premium", desc: "Access free tools or unlock premium insights with Pro" },
    { title: "Weekly Updates", desc: "New tools added every week, stay ahead of the curve" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose ToolNest</h2>
          <p className="text-muted max-w-2xl mx-auto">We cut through the noise so you can find exactly the right AI tool for your needs.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 text-center h-full">
                <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted text-sm">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}