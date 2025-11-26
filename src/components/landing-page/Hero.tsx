import { motion } from "framer-motion";
import StarIcon from "../../assets/StarIcon.png";
import DashboardStat from "./DashboardStat";
import { fadeUp, stagger } from "../../utils/animation";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 md:pt-32">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-72 w-72 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl" />
      </div>

      <motion.div
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 md:grid-cols-2 md:gap-20"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            New: Smart candidate pipelines
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl md:leading-tight">
            Find Your Dream{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Career
            </span>{" "}
            Today
          </h1>

          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-xl">
            Connect with top companies and discover opportunities that match
            your skills and ambitions. Your next career move starts here.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 hover:shadow-xl dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Get Started Free
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-8 py-4 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 hover:shadow-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            >
              Browse Jobs
            </Link>
          </div>

          <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <img src={StarIcon} alt="star" className="h-4 w-4" />
              <span>4.9/5 average rating</span>
            </div>
            <span>•</span>
            <span>No credit card required</span>
          </div>
        </motion.div>

        <motion.div className="relative" variants={fadeUp}>
          <div className="relative rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-2xl backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-800/80">
            {/* Floating elements for modern look - HIDDEN ON MOBILE */}
            <div className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-green-500 hidden md:block" />
            <div className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-blue-500 hidden md:block" />

            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-700">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                hirely.app
              </span>
            </div>

            <div className="grid gap-2 pt-6 md:grid-cols-2">
              <DashboardStat label="Active Jobs" value="1.2k+" trend="up" />
              <DashboardStat label="Companies" value="350+" trend="up" />
              <DashboardStat label="Success Rate" value="89%" trend="up" />
              <DashboardStat label="Avg. Response" value="24h" trend="down" />
            </div>

            <div className="mt-6 rounded-xl border border-zinc-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:border-zinc-700 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Application Progress
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  This week
                </span>
              </div>
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div className="h-full w-2/12 bg-blue-400" />
                <div className="h-full w-3/12 bg-blue-500" />
                <div className="h-full w-4/12 bg-blue-600" />
                <div className="h-full w-3/12 bg-blue-700" />
              </div>
              <div className="mt-2 flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>Applied</span>
                <span>Interview</span>
                <span>Offer</span>
                <span>Hired</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
