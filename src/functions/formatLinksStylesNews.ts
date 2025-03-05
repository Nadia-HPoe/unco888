export const formatTextWithPoints = (text: string) => {
    return text
        .replace(/(\d+\))/g, '\n$1')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
};