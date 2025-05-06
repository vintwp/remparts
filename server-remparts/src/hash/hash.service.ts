import { Injectable } from '@nestjs/common';
import { Hasher, hasher } from 'node-object-hash';

@Injectable()
export class HashService {
  private hasher: Hasher;

  constructor() {
    this.hasher = hasher({ sort: true });
  }

  generateHash<T extends Object>(objectToHash: T): string {
    const hash = this.hasher.hash({ objectToHash });

    return hash;
  }
}
