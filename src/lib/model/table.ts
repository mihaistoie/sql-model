"use strict";

import {DbColumn} from './column';
import {DbIndex} from './index';
import {DbFk, DbFkColumn} from './fk';


export class DbTable {
    
    //primaryKey
    public pk: string[];
    // columns
    public columns: DbColumn[];
    //Indexes
    public indexes: DbIndex[];
    //Foreing keys 
    public foreignKeys: DbFk[];
    //Table Name
    public tableName: string;

    constructor() {
        this.pk = [];
        this.columns = [];
        this.indexes = [];
        this.foreignKeys = [];

    }
    //Columns
    public columnByName(columnName: string): DbColumn {
        columnName = columnName.toUpperCase();
        return this.columns.find((column, index, obj) => {
            return column.columnName.toUpperCase() === columnName;
        });
    }
    public containsColumn(columnName: string): boolean {
        columnName = columnName.toUpperCase();
        return this.columns.findIndex((column) => {
            return column.columnName.toUpperCase() === columnName;
        }) >= 0;
    }
    public addColumn(column: DbColumn): void {
        column.tableName = this.tableName;
        this.columns.push(column);
    }
    //Indexes
    public indexByName(indexName: string): DbIndex {
        indexName = indexName.toUpperCase();
        return this.indexes.find((item, index, obj) => {
            return item.indexName.toUpperCase() === indexName;
        });
    }
    public containsIndex(indexName: string): boolean {
        indexName = indexName.toUpperCase();
        return this.indexes.findIndex((item) => {
            return item.indexName.toUpperCase() === indexName;
        }) >= 0;
    }
    public addIndex(index: DbIndex): void {
        index.tableName = this.tableName;
        this.indexes.push(index);
    }

    //Schema
    public createColumnsSQL(structure: string[]): void { }
    public createIndexesSQL(structure: string[]): void { }
    public createFKSQL(structure: string[]): void { }
    public createPKSQL(structure: string[]): void { }
        
    /// Returns true if the table contains an index 
    /// that starts with "fields" (comma-separated) ?
    public hasIndexForFields(fields: string): boolean {
        let ci = fields.toUpperCase() + ',';
        return this.indexes.findIndex(index => {
            return index.indexFields.toUpperCase().startsWith(ci);
        }) >= 0;
    }
    /// Create an index for evry foreign key
    public checkIndexesForFK(): void {
        let that = this;
        that.foreignKeys.forEach(function(fk: DbFk) {
            if (!that.hasIndexForFields(fk.indexFields)) {
                var ii = new DbIndex();
                ii.tableName = that.tableName;
                fk.columns.forEach(col => {
                    ii.addColumn(col.columnName, false);
                });
            }
        });
    }

}
