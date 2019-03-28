import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
        console.log('Hello StorageProvider Provider');
    }
    public setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    public getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    public removeItem(key) {
        localStorage.removeItem(key);
    }

}
