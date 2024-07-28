export default function (props: {
    title: string;
    children?: React.ReactNode;
    bordered?: boolean;
}) {
    return (
        <div className={`py-4 space-y-2 ${props.bordered ? "border-t-2" : ""}`}>
            <p className="text-gray-400 px-4">{props.title}</p>
            {props.children}
        </div>
    );
}
