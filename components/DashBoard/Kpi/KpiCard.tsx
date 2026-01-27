const KPICard = ({ kpi, onEdit, onDelete }: any) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5 h-[520px] flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold">{kpi.UserName}</h2>
        <div className="flex gap-2 text-sm">
          <button onClick={onEdit} className="text-blue-600">
            Edit
          </button>
          <button onClick={onDelete} className="text-red-600">
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 text-center mb-4">
        <div>
          <p className="text-xs text-gray-400">Hours</p>
          <p className="font-bold">{kpi.HoursWorked}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Salary</p>
          <p className="font-bold">PKR {kpi.Salary.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Points</p>
          <p className="font-bold text-green-600">
            {kpi.PointsGained}/{kpi.TotalPoints}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {kpi.Targets.map((t: any) => {
          const progress = (t.ValueAchieved / t.TargetValue) * 100
          return (
            <div key={t._id} className="border rounded-xl p-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{t.TargetName}</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {t.Priority}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default KPICard
