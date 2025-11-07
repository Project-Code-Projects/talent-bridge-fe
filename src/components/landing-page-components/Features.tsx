import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../utils/animation";
import FolderIcon from "../../assets/FolderIcon.png";
import UsersIcon from "../../assets/UsersIcon.png";
import ZapIcon from "../../assets/ZapIcon.png";
import ChartIcon from "../../assets/ChartIcon.png";

export default function Features() {
  const items = [
    {
      title: "Organize hiring in one place",
      desc: "Job briefs, candidates, feedback, and offers stay synced across your team.",
      icon: FolderIcon,
    },
    {
      title: "Collaborate with clarity",
      desc: "Inline notes, tagged mentions, and stage ownership reduce back‑and‑forth.",
      icon: UsersIcon,
    },
    {
      title: "Automate the busywork",
      desc: "Email templates, scheduling links, and pipeline automations save hours.",
      icon: ZapIcon,
    },
    {
      title: "Make data‑driven decisions",
      desc: "Dashboards reveal bottlenecks and highlight your best channels.",
      icon: ChartIcon,
    },
  ];

  return (
    <section
      id="overview"
      className="relative bg-linear-to-b from-white to-zinc-50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight md:text-4xl"
          >
            Streamlined hiring from role to offer
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-zinc-600">
            Hirely helps teams attract, evaluate, and hire great people without
            the spreadsheets.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <img src={item.icon} alt={item.title} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
