

type OptionsType = {
    icons: {
        easybit: string,
        letsexchange: string,
        letsexchange_fix: string,
        changelly: string
        changelly_fix: string
        change_now: string
        change_now_fix: string
    },
    names: {
        easybit: string,
        letsexchange: string,
        letsexchange_fix: string,
        changelly: string
        changelly_fix: string
        change_now: string
        change_now_fix: string
    }
}

export type AdapterName = "easybit" | "letsexchange" | "changelly" | "letsexchange_fix" | "changelly_fix" | "change_now" | "change_now_fix";

type AdapterDataFormatterProps = {
    adapterName: AdapterName,
}

function adapterDataFormatter({ adapterName }: AdapterDataFormatterProps) {
    const options: OptionsType = {
        icons: {
            easybit: "/imgs/easyBitIcon.png",
            letsexchange: "/imgs/letsExchangeIcon.png",
            letsexchange_fix: "/imgs/letsExchangeIcon.png",
            changelly: "/imgs/changelly.png",
            changelly_fix: "/imgs/changelly.png",
            change_now: "/imgs/changenow.svg",
            change_now_fix: "/imgs/changenow.svg"
        },
        names: {
            easybit: "EasyBit",
            letsexchange: "LetsExchange",
            letsexchange_fix: "LetsExchange",
            changelly: "Changelly",
            changelly_fix: "Changelly",
            change_now: "ChangeNow",
            change_now_fix: "ChangeNow"
        }
    }

    return {
        icon: options.icons[adapterName],
        name: options.names[adapterName]
    }
}

export { adapterDataFormatter }