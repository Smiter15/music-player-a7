import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {

    constructor() { }

    set(key, val): void {
        localStorage.setItem(key, val);
    }

    get(key): any {
        return localStorage.getItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

}
