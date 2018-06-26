import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'
import {TreeNode} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient ) { }

  getGoalMilestone() {
    return this.http.get(`https://f79a8aj0j5.execute-api.us-east-1.amazonaws.com/dev`)
    .toPromise()
    .then(res => <TreeNode[]> res);
  }
  listUsers() {
    return this.http.get('https://frtw82ac38.execute-api.us-east-1.amazonaws.com/dev/users')
  }
}
