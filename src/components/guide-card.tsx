
export default function GuideCard({ index, title }: { index: number; title: string }) {
    return (
        <div className=" relative inline-block p-2.5 rounded-lg w-full mb-5 z-30 max-w-[250px]" >
            <div
                style={{ background: "linear-gradient(195.05deg, rgba(213, 102, 0, 0.1) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(213, 102, 0, 0.06) 100%)" }}
                className="flex  flex-col items-center border card  border-[#D5660029] bg-red-500 z-10 p-4 h-fit rounded-[32px]  relative max-md:!w-full max-md:max-w-full"
            >
                <h1 className="text-[60px] font-bold text-[#D56600] z-10">{index}</h1>
                <p className="text-[#FFFFFFE0] text-[16px] w-[193px] text-center">{title}</p>
            </div>
            <div className="background-effect"></div>
        </div>
    );
}
