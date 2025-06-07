import { cn } from "@/lib/utils";
import React from 'react';

export const Container = ({className, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("mx-auto max-w-screen-xl px-4 md:px-8 xl:px-16", className)}
      {...props}
    />
  );
};
