import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Main from './Main'
export function CandidateModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-green-500 rounded-lg p-2 mx-3 my-3 text-white">
          Create A Candidate
        </button>
      </DialogTrigger>
      <DialogContent>
        <Main />
      </DialogContent>
    </Dialog>
  )
}
