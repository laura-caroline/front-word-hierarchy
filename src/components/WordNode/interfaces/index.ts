export interface WordNode {
    depth: number;
    items?: string[];
    subcategories?: Record<string, WordNode>;
}

export interface WordHierarchy {
    [key: string]: WordNode;
}


export interface WordNodeProps {
    node: WordNode;
    name: string;
    addItem?: (name: string, parent: WordNode) => void;
    addSubcategory: (name: string, parent: WordNode) => void;
}