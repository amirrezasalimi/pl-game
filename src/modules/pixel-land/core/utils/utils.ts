export const roundNum = (num: number) => {
    return Math.round(num * 100) / 100
}
export const loadJs = (url: string) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            resolve(script);
        }
        script.onerror = () => {
            reject();
        }
        document.head.appendChild(script);
    })
}