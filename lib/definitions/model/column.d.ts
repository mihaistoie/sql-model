import { DataTypes } from './datatypes';
export declare class DbColumn {
    tableName: string;
    columnName: string;
    type: DataTypes;
    dbType: string;
    size: number;
    precision: number;
    scale: number;
    nullable: boolean;
    defaultValue: string;
    constructor();
    createSQL(sql: string[]): void;
}
