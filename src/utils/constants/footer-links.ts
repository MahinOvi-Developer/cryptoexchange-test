const FOOTER_LINKS: Record<string, { name: string; link: string; blank?: string }[]> = {
    Resources: [
        {
            name: "Features",
            link: "#features",
        },
        {
            name: "SWAP",
            link: "#swap",
        },
        {
            name: "Discord",
            link: "#",
            blank: "_blank",
        },
        {
            name: "Telegram",
            link: "https://t.me/swp_gg_support",
            blank: "_blank",
        },
    ],

    Other: [
        {
            name: "BLOG",
            link: "/blog",
        },
    ],

    Company: [
        // {
        //     name: "Terms",
        //     link: "/terms",
        // },
        {
            name: "Support",
            link: "https://t.me/swp_gg_support",
            blank: "_blank",
        },
    ],
};

export { FOOTER_LINKS };
