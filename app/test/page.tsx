import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const Testpage = () => {
  
  return (
    <div>
          <p className="bg-yellow-700 p-6 text-black text-3xl font-bold ">Welcome</p>

    <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent className='bg-white'>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</div>
  )
}

export default Testpage;

