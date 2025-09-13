import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function BlogCard({ title, date, path, imgUrl }: { title: string; date: string; path: string; imgUrl: string }) {
    return (
        <Link
            style={{ background: "linear-gradient(195.05deg, rgba(213, 102, 0, 0.1) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(213, 102, 0, 0.06) 100%)" }}
            className="w-full max-w-[363px] h-[382px] p-7 rounded-[32px] border border-[#D5660052]"
            href={path}
        >
            <div className="w-full h-[180px]">
                <LazyLoadImage  src={imgUrl} alt="" className="w-full h-[180px] object-cover rounded-[18px]" />
            </div>
            <div className="flex flex-col justify-between gap-5 mt-3">
                <p className="w-[308px] font-medium text-[20px] text-white">{title}</p>
                <p className="text-white text-[14px] ">{date}</p>
            </div>
        </Link>
    );
}
