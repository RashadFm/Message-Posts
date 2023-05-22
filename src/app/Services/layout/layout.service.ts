import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  pageTitle: BehaviorSubject<string> = new BehaviorSubject('');
  isDataChange: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }
}
