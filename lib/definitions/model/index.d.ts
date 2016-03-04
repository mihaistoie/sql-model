export declare class DbIndexColumn {
    columnName: string;
    descending: boolean;
    constructor(colName: string, desc: boolean);
}
export declare class DbIndex {
    private _indexName;
    private _indexFields;
    tableName: string;
    unique: boolean;
    columns: DbIndexColumn[];
    constructor();
    indexName: string;
    indexFields: string;
    addColumn(columnName: string, descending: boolean): void;
    createSQL(sql: string[]): void;
}
