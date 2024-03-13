import React from 'react'

interface ChildrenProps{
    children: React.ReactNode
}


const AuthLayout = ({children}: ChildrenProps) => {
  return (
    <div className='flex h-full items-center justify-center'>
        {children}
    </div>
  )
}

export default AuthLayout;



