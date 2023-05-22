export class Generator {
    static generateUniqueId(): number {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return timestamp + random;
    }
}
