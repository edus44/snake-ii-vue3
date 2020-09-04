export const shuffle = <T>(arr: T[]): T[] => arr.slice(0).sort(() => Math.random() - 0.5)

export const rnd = (n: number) => (Math.random() * n) | 0