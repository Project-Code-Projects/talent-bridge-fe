import { fadeUp, stagger } from "../../utils/animation";
import CheckIcon from "../../assets/CheckIcon.png";
import { motion } from "framer-motion";
import StatBlock from "./StatBlock";
import { Link } from "react-router-dom";

export default function CompanyInfo() {
  return (
    <section
      id="company" // ADD THIS ID
      className="py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 md:grid-cols-2">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp}>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              ABOUT HIRELY
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight md:text-4xl"
          >
            Trusted by Job Seekers{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Worldwide
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-zinc-600 dark:text-zinc-400"
          >
            Hirely connects talented professionals with amazing opportunities.
            We're committed to making job searching simpler, faster, and more
            effective for everyone.
          </motion.p>

          <motion.ul
            variants={fadeUp}
            className="space-y-4 text-zinc-700 dark:text-zinc-300"
          >
            {[
              "Personalized job recommendations based on your profile",
              "Real-time application tracking and status updates",
              "Direct communication with employers",
              "Career growth insights and market trends",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <img src={CheckIcon} alt="check" className="h-3 w-3" />
                </div>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/auth?tab=signup"
              className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 hover:shadow-xl dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Create Account
            </Link>
            <Link
              to="/auth?tab=login"
              className="rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 hover:shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            >
              Log In
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white/80 shadow-2xl backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-800/80">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 divide-x divide-zinc-100 dark:divide-zinc-700">
              <StatBlock label="Jobs Posted" value="50k+" />
              <StatBlock label="Successful Hires" value="15k+" />
            </div>

            {/* Testimonial */}
            <div className="border-t border-zinc-100 p-8 dark:border-zinc-700">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                  JS
                </div>
                <div>
                  <blockquote className="text-lg italic text-zinc-700 dark:text-zinc-300">
                    "Hirely helped me land my dream job in just 2 weeks. The
                    platform made applying so much easier!"
                  </blockquote>
                  <div className="mt-4">
                    <div className="font-semibold text-zinc-900 dark:text-white">
                      John Smith
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      Software Engineer at TechCorp
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-blue-500" />
            <div className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-purple-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
