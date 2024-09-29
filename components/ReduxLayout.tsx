'use client'
import Store from '@/utils/Redux/Store/Store'
import React from 'react'
import { Provider } from 'react-redux'
import CondtionalLayout from './CondtionalLayout'

const ReduxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={Store}>
      <CondtionalLayout>{children}</CondtionalLayout>
    </Provider>
  )
}

export default ReduxLayout
