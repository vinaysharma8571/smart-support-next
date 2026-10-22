"use client";

import { useState } from "react";
import { Ticket, TicketCategory, TicketPriority } from "@/types/ticket";

type TicketFormProps = {
  onCreate: (ticket: Ticket) => void;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";

export default function TicketForm({ onCreate }: TicketFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TicketCategory | "">("");
  const [priority, setPriority] = useState<TicketPriority | "">("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (category === "" || priority === "") return;

    onCreate({
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      title: title.trim(),
      category,
      priority,
      description: description.trim(),
      status: "open",
    });

    setName("");
    setEmail("");
    setTitle("");
    setCategory("");
    setPriority("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-300 p-5 dark:border-gray-700"
    >
      <h3 className="text-xl font-bold">Create a Support Ticket</h3>
      <p className="mt-1 text-sm text-gray-500">
        Tell us about your problem and our support team will help you.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Full name</label>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email address</label>
          <input
            type="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Issue title</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Briefly describe your issue"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <select
            className={inputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value as TicketCategory | "")}
            required
          >
            <option value="">Select a category</option>
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
            <option value="account">Account</option>
            <option value="feature">Feature Request</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Priority</label>
          <select
            className={inputClass}
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority | "")}
            required
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">
            Describe your issue
          </label>
          <textarea
            className={inputClass}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain your problem in detail"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
      >
        Create ticket
      </button>
    </form>
  );
}