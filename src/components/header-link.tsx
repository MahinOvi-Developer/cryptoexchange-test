import Link from "next/link";

export default function HeaderLink({ name, url, type = "path", onClick = () => { } }: {
    name: string;
    url: string;
    type?: string;
    onClick?: () => void;
}) {
    return (
        <li onClick={onClick} className="hover:!text-[#D56600] z-[99999999999] transition-all">
            {type === "path" ? (
                <Link href={url.toLowerCase()}>{name}</Link>
            ) : (
                <a className="text-whtie z-[99999999999]" href={url.toLowerCase()}>
                    {name}
                </a>
            )}
        </li>
    );
}
