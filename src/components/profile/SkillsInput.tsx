import React, { useState } from "react";

type Props = {
  skills: string[];
  onChange: (skills: string[]) => void;
};

export default function SkillsInput({ skills, onChange }: Props) {
  const [value, setValue] = useState("");

  const addSkill = () => {
    const v = value.trim();
    if (v && !skills.includes(v)) {
      onChange([...skills, v]);
      setValue("");
    }
  };

  const removeSkill = (s: string) => {
    onChange(skills.filter((x) => x !== s));
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a skill and press Add"
        />
        <button type="button" onClick={addSkill}>
          Add
        </button>
      </div>
      <div className="flex gap-2 mt-2 flex-wrap">
        {skills.map((s) => (
          <span key={s} className="px-2 py-1 rounded-full bg-zinc-100">
            {s}{" "}
            <button
              onClick={() => removeSkill(s)}
              className="ml-2 text-red-500"
            >
              x
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
