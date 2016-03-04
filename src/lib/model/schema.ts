"use strict";

import {DbTable} from './table';
import {DbColumn} from './column';
import {DbIndex} from './index';
import {DbFk, DbFkColumn} from './fk';


export class DbSchema {
    //List of tables
    public tables: DbTable[];
        
    //Tables
    public tableByName(tableName: string): DbTable {
        tableName = tableName.toUpperCase();
        return this.tables.find((table, index, obj) => {
            return table.tableName.toUpperCase() === tableName;
        });
    }
    public containsTable(tableName: string): boolean {
        tableName = tableName.toUpperCase();
        return this.tables.findIndex((table) => {
            return table.tableName.toUpperCase() === tableName;
        }) >= 0;
    }

    // Database Management : create / drop / exists
    public createDatabase(url: string): Promise<void> {
        return Promise.resolve();
    }
    public databaseExists(url: string): Promise<boolean> {
        return Promise.resolve(false);
    }
    public dropDatabase(url: string): Promise<void> {
        return Promise.resolve();
    }

    //Factory
    public Table(): DbTable {
        return new DbTable();
    }
    public Column(): DbColumn {
        return new DbColumn();
    }

    public Index(): DbIndex {
        return new DbIndex();
    }

    public Foreignkey(): DbFk {
        return new DbFk();
    }
    
    // Structure
    public load(url: string): Promise<void> {
        this.tables = [];
        return Promise.resolve();
    }

    public executeSchemaScript(url: string, structure: string[]): Promise<void> {
        //structure.forEach(sql => {return execSql(dsql)})
        return Promise.resolve();
    }

    // Check model before generate migration script
    public checkModel() {
        this.tables.forEach(table => { table.checkIndexesForFK(); });
    }

    // SQL
    // Generate create script for database
    public createSQL(createTables: boolean, createIndexes: boolean, createFKs: boolean): any {
        var structure = { tables: [], indexes: [], fk: [], pk: [] };
        if (createTables) {
            this.tables.forEach(table => {
                table.createColumnsSQL(structure.tables);
                table.createPKSQL(structure.pk);
            });
        }
        if (createIndexes) {
            this.tables.forEach(table => {
                table.createIndexesSQL(structure.indexes);
            });
        }
        if (createIndexes && createFKs) {
            this.tables.forEach(table => {
                table.createFKSQL(structure.fk);
            });
        }
        return structure;
    }

}