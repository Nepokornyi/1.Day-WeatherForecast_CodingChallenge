import { classNames } from '@/lib/utils'
import React, { ReactNode } from 'react'

export const MaxWidthWrapper = ({
    className,
    children,
}: {
    className?: string
    children: ReactNode
}) => {
    return (
        //* helper function to merge all css classes
        <div
            className={classNames(
                'mx-auto w-full max-w-screen-x1 px-2.5 md:px-20',
                className
            )}
        >
            {children}
        </div>
    )
}
