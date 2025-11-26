import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../utils/animation";
import FolderIcon from "../../assets/FolderIcon.png";
import UsersIcon from "../../assets/UsersIcon.png";
import ZapIcon from "../../assets/ZapIcon.png";
import ChartIcon from "../../assets/ChartIcon.png";

export default function Features() {
  const items = [
    {
      title: "Smart Job Matching",
      desc: "AI-powered recommendations that match your skills and preferences with the perfect opportunities.",
      icon: FolderIcon,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Real-time Applications",
      desc: "Track your applications in real-time with instant status updates and employer responses.",
      icon: UsersIcon,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Quick Apply Process",
      desc: "One-click applications with your saved profile. No more filling out the same information repeatedly.",
      icon: ZapIcon,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Career Insights",
      desc: "Get valuable insights into your job search performance and market trends in your industry.",
      icon: ChartIcon,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section
      id="overview" // ADD THIS ID
      className="relative py-20 md:py-28"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-900 dark:to-zinc-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#374151_1px,transparent_1px)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              WHY CHOOSE US
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight md:text-5xl"
          >
            Everything You Need for Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Job Search
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-zinc-600 dark:text-zinc-400"
          >
            We've built the most comprehensive platform to help you find, apply,
            and land your dream job.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 dark:border-zinc-700 dark:bg-zinc-800/80"
            >
              {/* Gradient Background Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              />

              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.gradient} shadow-lg`}
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="h-7 w-7 filter brightness-0 invert"
                />
              </div>

              <h3 className="relative mt-6 text-xl font-semibold text-zinc-900 dark:text-white">
                {item.title}
              </h3>

              <p className="relative mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.desc}
              </p>

              {/* Hover Arrow */}
              <div className="relative mt-6 text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-blue-400">
                <span className="text-sm font-medium">Learn more →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
