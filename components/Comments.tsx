"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { TicketComment } from "@/types/ticket";

type CommentsProps = {
  ticketId: number;
};

export default function Comments({ ticketId }: CommentsProps) {
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await apiRequest<TicketComment[]>(
          `/api/tickets/${ticketId}/comments`
        );
        setComments(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not load comments."
        );
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, [ticketId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (text.trim() === "") return;

    setSending(true);

    try {
      const created = await apiRequest<TicketComment>(
        `/api/tickets/${ticketId}/comments`,
        {
          method: "POST",
          body: JSON.stringify({ body: text }),
        }
      );

      setComments((current) => [...current, created]);
      setText("");
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not add your comment."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mt-4 border-t border-gray-300 pt-4 dark:border-gray-700">
      <h5 className="text-sm font-semibold">Comments</h5>

      {loading ? (
        <p className="mt-2 text-sm text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">No comments yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{comment.authorName}</span>
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs capitalize text-indigo-700">
                  {comment.authorRole}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 whitespace-pre-wrap">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="mt-3 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-3 flex flex-col gap-2 sm:flex-row"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          placeholder="Write a comment..."
          className="w-full flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          disabled={sending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 sm:self-start"
        >
          {sending ? "Sending..." : "Add comment"}
        </button>
      </form>
    </div>
  );
}