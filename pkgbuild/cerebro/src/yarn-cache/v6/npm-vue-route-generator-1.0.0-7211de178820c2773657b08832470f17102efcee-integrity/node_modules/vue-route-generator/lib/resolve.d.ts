export interface PageMeta {
    name: string;
    chunkName: string;
    specifier: string;
    path: string;
    pathSegments: string[];
    component: string;
    children?: PageMeta[];
    routeMeta?: any;
    route?: any;
}
export declare function resolveRoutePaths(paths: string[], importPrefix: string, nested: boolean, readFile: (path: string) => string): PageMeta[];
