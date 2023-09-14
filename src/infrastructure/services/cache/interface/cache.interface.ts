export interface Cache {
  get(key: string): unknown;
  set(key: string, value: any, ttl: number): void;
}
