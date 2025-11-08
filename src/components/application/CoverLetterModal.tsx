import React from "react";

type Props = {
  open: boolean;
  initialValue?: string;
  onClose: () => void;
  onConfirm: (coverLetter?: string) => Promise<void> | void;
  submitting?: boolean;
};

export default function CoverLetterModal({
  open,
  initialValue = "",
  onClose,
  onConfirm,
  submitting = false,
}: Props) {
  const [text, setText] = React.useState(initialValue);

  React.useEffect(() => {
    if (open) setText(initialValue);
  }, [open, initialValue]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          if (!submitting) onClose();
        }}
      />
      {/* modal */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">
          Add a cover letter (optional)
        </h3>
        <p className="text-sm text-zinc-600 mb-4">
          Write a short message to the recruiter. This is optional — leave empty
          to submit without a cover letter.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full border border-zinc-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Hello, I'm excited about this role because..."
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onClose()}
            disabled={submitting}
            className="rounded-lg px-4 py-2 text-sm font-medium border border-zinc-300 bg-white hover:bg-zinc-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(text.trim() ? text.trim() : undefined)}
            disabled={submitting}
            className="rounded-lg px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            {submitting ? "Submitting..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
