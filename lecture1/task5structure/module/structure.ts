import type { IStructure } from "../interface/i-structure";

export type TypeResultBuilder = (key: string) => number;

class Structure<T> implements IStructure<T> {
  #arrData: T[];

  #getIndexFromCompilerFn: TypeResultBuilder;

  constructor(arrKeys: string[]) {
    this.#arrData = new Array(arrKeys.length);
    this.#getIndexFromCompilerFn = this.#builder(arrKeys);
  }

  #builder(arrKeys: string[]): TypeResultBuilder {
    return function (key: string) {
      let functionBody = "switch(keyValue) { ";

      for (let m = 0; m < arrKeys.length; m++) {
        functionBody += `case "${arrKeys[m]}": return ${m}; `;
      }

      functionBody += `default: throw new Error("key is not found"); }`;

      return new Function("keyValue", functionBody)(key);
    };
  }

  set(keyStructure: string, value: T): IStructure<T> {
    this.#arrData[this.#getIndexFromCompilerFn(keyStructure)] = value;
    return this;
  }

  get(keyStructure: string): T {
    return this.#arrData[this.#getIndexFromCompilerFn(keyStructure)];
  }
}

export default Structure;
