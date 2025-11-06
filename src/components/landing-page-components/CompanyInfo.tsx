import CheckIcon from "../assets/CheckIcon.png";
import { motion } from "framer-motion";
import { fadeUp } from "../../framer-setup/framer";
import StatBlock from "../../landing-ui-helpers/StatBlock";

export default function CompanyInfo() {
  return (
    <section id="company" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="order-2 md:order-1"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Built for modern hiring teams
          </h2>
          <p className="mt-4 text-zinc-600">
            Hirely is a hiring management tool focused on clarity and
            collaboration. From talent sourcing to offers, we design workflows
            that empower recruiters and hiring managers to move quickly without
            sacrificing candidate experience.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-zinc-700">
            <li className="flex items-start gap-2">
              <img src={CheckIcon} alt="check" className="mt-0.5 h-5 w-5" />{" "}
              Candidate‑first experience
            </li>
            <li className="flex items-start gap-2">
              <img src={CheckIcon} alt="check" className="mt-0.5 h-5 w-5" />{" "}
              Secure, role‑based access
            </li>
            <li className="flex items-start gap-2">
              <img src={CheckIcon} alt="check" className="mt-0.5 h-5 w-5" /> API
              & integrations
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/signup"
              className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Create account
            </a>
            <a
              href="/login"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Log in
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="order-1 md:order-2"
        >
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="grid grid-cols-2 divide-x divide-zinc-100">
              <StatBlock label="Candidates processed" value="12k+" />
              <StatBlock label="Teams using Hirely" value="350+" />
            </div>
            <div className="border-t border-zinc-100 p-6">
              <blockquote className="text-sm italic text-zinc-700">
                “Hirely replaced three tools and cut our time‑to‑hire by 35% in
                a quarter.”
              </blockquote>
              <div className="mt-3 text-xs text-zinc-500">
                — Ops Lead, Series B SaaS
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
