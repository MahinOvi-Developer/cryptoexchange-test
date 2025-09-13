import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Card({ title, desc, imgUrl }: { title: string; desc: string; imgUrl: string }) {
    return (
        <div className="flex flex-col items-center justify-center mx-6 max-md:my-5 glass rounded-[20px] p-6 floating-card max-w-[280px]">
            <div className="w-full max-w-fit mb-4">
                <LazyLoadImage src={imgUrl} alt="" className="w-16 h-16 object-contain" />
            </div>
            <div className="text-center">
                <h2 className="text-white text-[24px] font-semibold mb-3 leading-tight">{title}</h2>
                <p className="text-[14px] text-white/80 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
