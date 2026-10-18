type StatCardProps = {
  title: string;
  value: number;
};

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-300 p-5 dark:border-gray-700">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}