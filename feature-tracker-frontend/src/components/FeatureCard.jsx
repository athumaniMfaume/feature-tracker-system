export default function FeatureCard({
  feature,
  onDelete,
  onStatusChange,
  onEdit,
}) {
  const statusColor = {
    Open: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  const priorityColor = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="
      bg-white/70 backdrop-blur-xl
      border border-white/40
      rounded-2xl
      shadow-sm
      p-5
      hover:shadow-xl
      hover:-translate-y-1
      transition-all duration-300
      flex flex-col gap-3
    ">

      {/* HEADER */}
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-lg font-bold text-gray-800 leading-snug">
          {feature.title}
        </h2>

        <span className={`text-[11px] px-2 py-1 rounded-full ${statusColor[feature.status]}`}>
          {feature.status}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 line-clamp-2">
        {feature.description}
      </p>

      {/* PRIORITY + DATE */}
      <div className="flex justify-between items-center">
        <span className={`text-[11px] px-2 py-1 rounded-full ${priorityColor[feature.priority]}`}>
          {feature.priority}
        </span>

        <div className="text-[11px] text-gray-500 text-right">
          <div>Created: {formatDate(feature.created_at)}</div>

          {feature.updated_at && feature.updated_at !== feature.created_at && (
            <div>Updated: {formatDate(feature.updated_at)}</div>
          )}
        </div>
      </div>

      {/* STATUS CHANGE */}
      <select
        className="
          text-xs border border-gray-200
          rounded-lg px-2 py-2
          bg-white
          focus:outline-none focus:ring-2 focus:ring-indigo-300
        "
        value={feature.status}
        onChange={(e) => onStatusChange(feature.id, e.target.value)}
      >
        <option>Open</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={() => onEdit(feature)}
          className="
            text-xs px-3 py-1.5
            bg-indigo-600 text-white
            rounded-lg
            hover:bg-indigo-700
            transition
          "
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(feature.id)}
          className="
            text-xs px-3 py-1.5
            bg-red-500 text-white
            rounded-lg
            hover:bg-red-600
            transition
          "
        >
          Delete
        </button>
      </div>

    </div>
  );
}