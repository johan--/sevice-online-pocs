import { Injectable } from '@angular/core';

@Injectable()
export class DashboardContextService {

  startDate: Date = new Date(new Date().getTime() - 3600 * 24 * 1000);
  endDate: Date = new Date();

  constructor() { }

}
