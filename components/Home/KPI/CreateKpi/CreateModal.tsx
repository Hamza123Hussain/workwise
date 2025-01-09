import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CreateKPIButton from './CreateButton'
import TargetForm from './CreationForm/MainForm'
export function KpiModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <CreateKPIButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <div className="h-[60vh] overflow-y-auto">
          <TargetForm />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
