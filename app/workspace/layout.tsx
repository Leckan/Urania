import React from 'react'
import AppSidebar from '@/components/custom/workspace/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 bg-slate-50">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default WorkspaceLayout
