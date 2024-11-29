import React from 'react';

interface SidebarMenuProps {
    title: string;
    children?: React.ReactNode;
    bordered?: boolean;
}

export default function ({ children, bordered, title }: SidebarMenuProps) {
    const borderClass = bordered ? 'border-t-2' : '';
    const hasChildren = React.Children.toArray(children).length > 0;
    const displayTitle = title.toUpperCase();
    return hasChildren ? (
        <div className={`sidebar-menu w-full space-y-2 py-4 ${borderClass}`}>
            <p
                title={displayTitle}
                className='sidebar-item-header truncate px-4 text-sidebar-header-foreground'
            >
                {displayTitle}
            </p>
            {children}
        </div>
    ) : null;
}
