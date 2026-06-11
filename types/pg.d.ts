declare module 'pg' {
  export class Client {
    constructor(config?: { connectionString?: string })
    connect(): Promise<void>
    query(queryText: string): Promise<unknown>
    end(): Promise<void>
  }
}
