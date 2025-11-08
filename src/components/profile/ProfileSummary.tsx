import React from "react";
import type { TProfile } from "../../types/profile.types";

export default function ProfileSummary({ profile }: { profile: TProfile }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{profile.fullName}</h2>
      <p>{profile.summary}</p>
      <p>
        <strong>Phone:</strong> {profile.phone}
      </p>
      <p>
        <strong>Address:</strong> {profile.address}
      </p>

      <h3 className="mt-4 text-lg">Skills</h3>
      <div className="flex gap-2 flex-wrap">
        {profile.skills.map((s) => (
          <span key={s} className="px-2 py-1 bg-zinc-100 rounded">
            {s}
          </span>
        ))}
      </div>

      <h3 className="mt-4 text-lg">Experiences</h3>
      <ul>
        {profile.experiences.map((e, i) => (
          <li key={i}>
            <strong>{e.role}</strong> at <em>{e.company}</em> ({e.startDate} -{" "}
            {e.endDate || "Present"})
          </li>
        ))}
      </ul>

      {profile.resumeUrl && (
        <p className="mt-2">
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
            View Resume
          </a>
        </p>
      )}
    </div>
  );
}
