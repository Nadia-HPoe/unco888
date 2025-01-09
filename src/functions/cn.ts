export const cn = (...args: (string | boolean | undefined)[]): string => {
    return args.filter(Boolean).join(' ');
};