export default interface ModInfo {
    name: string;
    version: string;
    author: string;
    description: string;
    priority: number;
    dependencies: string[];
    assets: string[];
}