type Promisable<T> = {
  readonly [P in keyof T]: T extends undefined ? Promise<T[P]> : T[P];
};
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
export type RecursivePromisable<T> = {
  [P in keyof T]?:
  T[P] extends undefined ? Promise<T[P]> :
    T[P] extends (infer U)[] ? RecursivePromisable<U>[] :
      T[P] extends object ? RecursivePromisable<T[P]> :
        Promisable<T[P]>;
};

type ICart = {
  id: number
  items: IItem[] | undefined
  status: string | undefined
}
type IItem = {
  id: number
  status: string | undefined
}
