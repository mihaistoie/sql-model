import { DbColumn } from './column';
import { DbIndex } from './index';
import { DbFk } from './fk';
export declare class DbTable {
    pk: string[];
    columns: DbColumn[];
    indexes: DbIndex[];
    foreignKeys: DbFk[];
    tableName: string;
    constructor();
    columnByName(columnName: string): DbColumn;
    containsColumn(columnName: string): boolean;
    addColumn(column: DbColumn): void;
    indexByName(indexName: string): DbIndex;
    containsIndex(indexName: string): boolean;
    addIndex(index: DbIndex): void;
    createColumnsSQL(structure: string[]): void;
    ceateIndexesSQL(structure: string[]): void;
    createFKSQL(structure: string[]): void;
    createPKSQL(structure: string[]): void;
    hasIndexForFields(fields: string): boolean;
    checkIndexesForFK(): void;
}
