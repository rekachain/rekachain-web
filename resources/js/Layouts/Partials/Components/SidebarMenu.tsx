import React from 'react';

interface SidebarMenuProps {
    title: string;
    children?: React.ReactNode;
    bordered?: boolean;
}

export default function ({ children, bordered, title }: SidebarMenuProps) {
    const borderClass = bordered ? 'border-t-2' : '';
    const hasChildren = React.Children.toArray(children).length > 0;
    return hasChildren ? (
        <div className={`sidebar-menu w-full py-4 space-y-2 ${borderClass}`}>
            <p className="sidebar-item-header text-sidebar-header-foreground px-4 truncate" title={title}>
                {title}
            </p>
            {children}
        </div>
    ) : null;
}
