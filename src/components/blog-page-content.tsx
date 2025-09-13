import { useParams } from "next/navigation";
import HowToSwp from "./how-to-swap";
import GetStarted from "./get-started";
import CryptocurrencyInfo from "./crypto-currency-info";


export default function BlogPageContent() {
    const params = useParams();
    const blogId = params.blogId as string;
    
    
    if (blogId === "1") return <HowToSwp />;
    if (blogId === "2") return <GetStarted />;
    if (blogId === "3") return <CryptocurrencyInfo />;
}
