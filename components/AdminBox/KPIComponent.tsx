import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { GetAllKpi } from '@/functions/Kpi/GetAllKpis'
import { setKpis } from '@/utils/Redux/Slice/kpi/KpiListSlice'
import DeleteConfirmModal from '../DashBoard/Kpi/DeleteConfirmModal'
import CreateEditKpiModal from '../DashBoard/Kpi/CreateEditModal'
import KPICard from '../DashBoard/Kpi/KpiCard'
import toast from 'react-hot-toast'
import { deleteKPI } from '@/functions/Kpi/DeleteKPi'
const KPIComponent = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const kpis = useSelector((state: RootState) => state.KpiList)

  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedKpi, setSelectedKpi] = useState<any>(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const data = await GetAllKpi(user._id)
      if (data) dispatch(setKpis(data))
      setLoading(false)
    }
    fetch()
  }, [user._id, dispatch])
  const handleConfirmDelete = async () => {
    if (!selectedKpi?._id) return

    try {
      const result = await deleteKPI(selectedKpi.UserId, selectedKpi._id)
      if (result.success) {
        toast.success('KPI deleted successfully!')
        // Refresh the KPI list
        const data = await GetAllKpi(user._id)
        if (data) dispatch(setKpis(data))
      } else {
        toast.error('Error: ' + result.error)
      }
    } catch (err: any) {
      console.error(err)
      toast.error('An unexpected error occurred')
    } finally {
      setDeleteOpen(false)
      setSelectedKpi(null)
    }
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">My KPIs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {!loading &&
          kpis?.map((kpi: any) => (
            <KPICard
              key={kpi._id}
              kpi={kpi}
              onEdit={() => {
                setSelectedKpi(kpi)
                setEditOpen(true)
              }}
              onDelete={() => {
                setSelectedKpi(kpi)
                setDeleteOpen(true)
              }}
            />
          ))}
      </div>

      {/* Add KPI */}
      <button
        onClick={() => setCreateOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg"
      >
        + Add KPI
      </button>

      {/* Modals */}
      {createOpen && (
        <CreateEditKpiModal
          mode="create"
          onClose={() => setCreateOpen(false)}
        />
      )}

      {editOpen && selectedKpi && (
        <CreateEditKpiModal
          mode="edit"
          kpi={selectedKpi}
          onClose={() => setEditOpen(false)}
        />
      )}

      {deleteOpen && selectedKpi && (
        <DeleteConfirmModal
          onCancel={() => setDeleteOpen(false)}
          onConfirm={() => {
            handleConfirmDelete()
            setDeleteOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default KPIComponent
