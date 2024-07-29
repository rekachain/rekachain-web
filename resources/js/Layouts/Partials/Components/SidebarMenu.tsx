export default function (props: {
    title: string;
    children?: React.ReactNode;
    bordered?: boolean;
}) {
    const borderClass = props.bordered ? "border-t-2" : "";
    return (
        <div className={`sidebar-menu w-full py-4 space-y-2 ${borderClass}`}>
            <p
                className="sidebar-item-header text-sidebar-header-foreground px-4 truncate"
                title={props.title}
            >
                {props.title}
            </p>
            {props.children}
        </div>
    );
}
