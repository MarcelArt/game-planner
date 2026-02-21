// components/layout/spacer.tsx

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  flex?: number
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, flex = 1, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{ flexGrow: flex, ...style }}
        className={cn("min-w-0", className)}
        {...props}
      />
    )
  }
)

Spacer.displayName = "Spacer"