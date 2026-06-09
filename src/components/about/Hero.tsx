import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    
    <section className="min-h-[70vh] flex flex-col-reverse md:flex-row items-center container py-12">
      {/* Left side illustration */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/about-hero.png"
            alt="About illustration"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </div>

      {/* Right side content */}
      <div className="w-full md:w-1/2 space-y-6">
        <motion.h1
          className="section-title gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          من نحن
        </motion.h1>
        <motion.p
          className="text-lg text-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          شركة دهب سوفت وير—نبني حلولاً برمجية متكاملة تُترجم رؤيتك إلى نتائج ملموسة.
        </motion.p>
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="font-bold text-primary">مهمتنا</p>
          <p>تقديم برمجيات ذات قيمة واضحة عبر منهجية عمل منظمة: اكتشاف دقيق، تحليل معمق، تصميم وتجربة مستخدم، ثم تطوير واختبار ونشر—مع دعم مستمر بعد الإطلاق.</p>
        </motion.div>
        <motion.div
          className="flex gap-4 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/contact" className="btn-primary">تواصل معنا</Link>
          <Link href="/services" className="btn-outline-primary">استكشف خدماتنا</Link>
        </motion.div>
      </div>
    </section>
  );
}
