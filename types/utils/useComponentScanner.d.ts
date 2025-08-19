export interface ComponentInfo {
    category: string;
    name: string;
    displayName: string;
    vuePath: string;
    docPath: string;
    docContent: string;
    displayPath: string;
}
export declare function useComponentScanner(): {
    components: import("vue").Ref<{
        category: string;
        name: string;
        displayName: string;
        vuePath: string;
        docPath: string;
        docContent: string;
        displayPath: string;
    }[], ComponentInfo[] | {
        category: string;
        name: string;
        displayName: string;
        vuePath: string;
        docPath: string;
        docContent: string;
        displayPath: string;
    }[]>;
    loadComponents: () => Promise<void>;
};
