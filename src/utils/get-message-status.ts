type StatusMessages = { [key: string]: string };

function getStatusMessage(status?: string, ...sources: StatusMessages[]): string | null {
    for (const source of sources) {
        if (status && source[status]) {
            return source[status];
        }
    }
    return null
}


export { getStatusMessage }