import type { Knex } from 'knex';
import type { ID } from '../types';
import { QueryBuilder } from '../query/query-builder';
export type Data = Record<string, unknown>;
export type Params = {
    where?: any;
    filters?: any;
    select?: any;
    populate?: any;
    orderBy?: any;
    _q?: string;
    data?: any;
    page?: number;
    pageSize?: number;
    limit?: number;
    offset?: number;
    count?: boolean;
};
type FindOneParams = Pick<Params, 'where' | 'select' | 'populate' | '_q' | 'orderBy'>;
export interface Repository {
    findOne(params?: FindOneParams): Promise<any>;
    findMany(params?: Params): Promise<any[]>;
    findWithCount(params?: Params): Promise<[any[], number]>;
    findPage(params: Params): Promise<{
        results: any[];
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    }>;
    create(params: Params): Promise<any>;
    createMany(params: Params): Promise<{
        count: number;
        ids: ID[];
    }>;
    update(params: Params): Promise<any>;
    updateMany(params: Params): Promise<{
        count: number;
    }>;
    clone(id: ID, params: Params): Promise<any>;
    delete(params: Params): Promise<any>;
    deleteMany(params?: Params): Promise<{
        count: number;
    }>;
    count(params?: Params): Promise<number>;
    attachRelations(id: ID, data: Data): Promise<any>;
    updateRelations(id: ID, data: Data): Promise<any>;
    deleteRelations(id: ID): Promise<any>;
    cloneRelations(targetId: ID, sourceId: ID, params: Params): Promise<any>;
    populate(entity: Entity, populate: Params['populate']): Promise<any>;
    load(entity: any, field: string | string[], populate?: Params['populate']): Promise<any>;
    loadPages<TField extends string>(entity: any, field: TField | TField[], populate?: Params['populate']): Promise<any>;
}
export type Entity = {
    id: ID;
    [key: string]: any;
};
export interface EntityManager {
    findOne(uid: string, params: Params): Promise<any>;
    findMany(uid: string, params: Params): Promise<any[]>;
    count(uid: string, params?: Params): Promise<number>;
    create(uid: string, params: Params): Promise<any>;
    createMany(uid: string, params: Params): Promise<{
        count: number;
        ids: ID[];
    }>;
    update(uid: string, params: Params): Promise<any>;
    updateMany(uid: string, params: Params): Promise<{
        count: number;
    }>;
    delete(uid: string, params: Params): Promise<any>;
    deleteMany(uid: string, params: Params): Promise<{
        count: number;
    }>;
    clone(uid: string, cloneId: ID, params: Params): Promise<any>;
    populate(uid: string, entity: Entity, populate: Params['populate']): Promise<Entity>;
    load(uid: string, entity: Entity, field: string | string[], populate?: Params['populate']): Promise<any>;
    attachRelations(uid: string, id: ID, data: any, options?: {
        transaction?: Knex.Transaction;
    }): Promise<any>;
    updateRelations(uid: string, id: ID, data: any, options?: {
        transaction?: Knex.Transaction;
    }): Promise<any>;
    deleteRelations(uid: string, id: ID, options?: {
        transaction?: Knex.Transaction;
    }): Promise<void>;
    cloneRelations(uid: string, targetId: ID, sourceId: ID, data: any, options?: {
        cloneAttrs?: string[];
        transaction?: Knex.Transaction;
    }): Promise<any>;
    createQueryBuilder(uid: string): QueryBuilder;
    getRepository(uid: string): Repository;
}
export {};
//# sourceMappingURL=types.d.ts.map