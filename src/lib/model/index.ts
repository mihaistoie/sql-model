"use strict";

import * as util from 'util';


export class DbIndexColumn {
    public columnName: string;
    public descending: boolean;
    constructor(colName: string, desc: boolean) {
        this.columnName = colName;
        this.descending = desc;
    }
}


export class DbIndex {
    private _indexName: string;
    private _indexFields: string;

    public tableName: string;
    public unique: boolean;
    public columns: DbIndexColumn[];

    constructor() {
        this.columns = [];
    }
    get indexName(): string {
        let that = this;
        if (that._indexName) return that._indexName;
        let fields = that.columns.map(column => {
            return column.columnName + (column.descending ? '_d' : '');
        })
        fields.unshift(that.tableName);
        that._indexName = fields.join('_');
        return that._indexName;
    }
    set indexName(value: string) {
        this._indexName = value;
    }
    get indexFields(): string {
        let that = this;
        if (that._indexFields) return that._indexFields;
        that._indexFields = that.columns.map(column => {
            return column.columnName;
        }).join(',');
        return that._indexFields;
    }
    // Add a column to index
    public addColumn(columnName: string, descending: boolean): void {
        this.columns.push(new DbIndexColumn(columnName, descending));
    }
    // Generate create sql for the index
    public createSQL(sql: string[]): void {
        let that = this;
        let cols = that.columns.map(column => {
            return column.columnName + (column.descending ? ' DESC' : '');
        }).join(', ');
        sql.push(util.format("CREATE %sINDEX %s ON  %s(%s)", (that.unique ? "UNIQUE " : ''),
            that.indexName, that.tableName, cols));
    }
}