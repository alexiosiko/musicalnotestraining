import React from 'react'

export default function Text({ children, className }: { 
	children: React.ReactNode,
	className?: string
}) {
  return (
	<div className={`${className} text-foreground`}>{children}</div>
  )
}
