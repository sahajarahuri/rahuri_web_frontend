"use client";

import { motion } from "framer-motion";

export default function ShantiMantra() {
  return (
    <section className="py-20 md:py-24 bg-background border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="gold-rule max-w-[100px] mx-auto mb-6 text-accent text-lg">
          <span className="marathi">॥ ॐ ॥</span>
        </div>

        <div className="marathi text-xl md:text-2xl text-primary leading-loose font-medium mb-4">
          सर्वे भवन्तु सुखिनः · सर्वे सन्तु निरामयाः<br />
          सर्वे भद्राणि पश्यन्तु · मा कश्चित् दुःखभाग्भवेत्
        </div>

        <div className="italic text-sm text-muted-foreground max-w-md mx-auto">
          May all be happy. May all be free from illness.<br />
          May all see what is auspicious. May none suffer.
        </div>
      </motion.div>
    </section>
  );
}
