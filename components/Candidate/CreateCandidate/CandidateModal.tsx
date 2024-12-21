import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Main from './Main'
export function CandidateModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Edit Profile</button>
      </DialogTrigger>
      <DialogContent>
        <Main />
      </DialogContent>
    </Dialog>
  )
}
