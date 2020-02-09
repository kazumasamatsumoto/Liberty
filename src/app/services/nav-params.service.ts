import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavParamsService {
  private destn;
  constructor() { }

  public set(destn) {
    this.destn = destn;
  }

  get() {
    return this.destn;
  }
}
