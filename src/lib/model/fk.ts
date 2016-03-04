"use strict";

import * as util from 'util';


export class DbFkColumn {
    public columnName: string;
    public uniqueColumnName: string;
    constructor(colName: string, uniqueColumnName: string) {
        this.columnName = colName;
        this.uniqueColumnName = uniqueColumnName;
    }
}


export class DbFk {
    private _indexFields: string;
    public FKName: string;
    public columns: DbFkColumn[];
    public deleteCascade: boolean;
    public deleteSetNull: boolean;
    public tableName: string
    public uniqueTableName: string
    constructor() {
        this.columns = [];
    }
    public addColumn(columnName: string, uniqueColumnName: string): void {
        this.columns.push(new DbFkColumn(columnName, uniqueColumnName));
    }
    get indexFields(): string {
        if (!this._indexFields) {
            this._indexFields = this.columns.map(column => { return column.columnName }).join(',');
        }
        return this._indexFields;
    }
    set indexFields(value: string) {
        this._indexFields = value;
    }
}
