import { motion } from "framer-motion";
import StarIcon from "../assets/StarIcon.png";
import DashboardStat from "./DashboardStat";
import { fadeUp, stagger } from "../../utils/animation";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-72 w-72 rounded-full blur-3xl bg-blue-100" />
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full blur-3xl bg-indigo-100" />
      </div>

      <motion.div
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16"
      >
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 shadow">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            New: Smart candidate pipelines
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Hirely — your all‑in‑one hiring management tool
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 md:text-lg">
            Streamline job postings, track applicants, collaborate with your
            team, and make better hiring decisions—faster.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-zinc-800"
            >
              Get started for free
            </a>
            <a
              href="#overview"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              See how it works
            </a>
          </div>

          <div className="mt-6 flex items-center gap-5 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <img src={StarIcon} alt="star" className="h-4 w-4" />
              4.9/5 average rating
            </div>
            <span>•</span>
            No credit card required
          </div>
        </motion.div>

        <motion.div className="relative" variants={fadeUp}>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-zinc-200" />
                <div className="h-3 w-3 rounded-full bg-zinc-200" />
                <div className="h-3 w-3 rounded-full bg-zinc-200" />
              </div>
              <span className="text-xs text-zinc-500">hirely.app</span>
            </div>

            <div className="grid gap-4 pt-4 md:grid-cols-2">
              <DashboardStat label="Open roles" value="12" trend="up" />
              <DashboardStat label="Active candidates" value="247" trend="up" />
              <DashboardStat
                label="Avg. time‑to‑hire"
                value="23d"
                trend="down"
              />
              <DashboardStat label="Offer acceptance" value="91%" trend="up" />
            </div>

            <div className="mt-4 rounded-xl border border-zinc-100 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">
                  Pipeline — Product Designer
                </span>
                <span className="text-xs text-zinc-500">This week</span>
              </div>
              <div className="flex h-2 w-full overflow-hidden rounded-full">
                <div className="h-full w-2/12 bg-indigo-200" />
                <div className="h-full w-3/12 bg-indigo-300" />
                <div className="h-full w-4/12 bg-indigo-400" />
                <div className="h-full w-3/12 bg-indigo-500" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
