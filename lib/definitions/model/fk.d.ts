export declare class DbFkColumn {
    columnName: string;
    uniqueColumnName: string;
    constructor(colName: string, uniqueColumnName: string);
}
export declare class DbFk {
    private _indexFields;
    FKName: string;
    columns: DbFkColumn[];
    deleteCascade: boolean;
    deleteSetNull: boolean;
    tableName: string;
    uniqueTableName: string;
    constructor();
    addColumn(columnName: string, uniqueColumnName: string): void;
    indexFields: string;
}
