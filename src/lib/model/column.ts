"use strict";

import {DataTypes} from './datatypes';

export class DbColumn {
    public tableName: string;
    public columnName: string;
    public type: DataTypes;
    public dbType: string;
    public size: number;
    public precision: number;
    public scale: number;
    public nullable: boolean;
    public defaultValue: string;
    constructor() {
        this.size = 0;
        this.precision = 0;
        this.scale = 0;
        this.nullable = true;
    }
    public createSQL(sql: string[]) { }
}