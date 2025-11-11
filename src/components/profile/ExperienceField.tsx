import type { TExperience } from "../../types/profile.types";

type Props = {
  experience: TExperience;
  index: number;
  onChange: (index: number, exp: TExperience) => void;
  onRemove: (index: number) => void;
};

export default function ExperienceField({
  experience,
  index,
  onChange,
  onRemove,
}: Props) {
  return (
    <div className="space-y-2 border rounded p-3">
      <div className="flex gap-2">
        <input
          name="company"
          placeholder="Company"
          value={experience.company}
          onChange={(e) =>
            onChange(index, { ...experience, company: e.target.value })
          }
          className="flex-1"
        />
        <input
          name="role"
          placeholder="Role"
          value={experience.role}
          onChange={(e) =>
            onChange(index, { ...experience, role: e.target.value })
          }
          className="flex-1"
        />
      </div>
      <div className="flex gap-2">
        <input
          type="date"
          name="startDate"
          value={experience.startDate}
          onChange={(e) =>
            onChange(index, { ...experience, startDate: e.target.value })
          }
        />
        <input
          type="date"
          name="endDate"
          value={experience.endDate || ""}
          onChange={(e) =>
            onChange(index, {
              ...experience,
              endDate: e.target.value || undefined,
            })
          }
        />
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-600"
        >
          Remove
        </button>
      </div>
      <div>
        <textarea placeholder="Description (optional)" className="w-full" />
      </div>
    </div>
  );
}
