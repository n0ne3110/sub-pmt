import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs'
import { AppService } from './app.service'
import { MenuItem } from 'primeng/api'
import { TreeNode } from 'primeng/api';

import _ from 'lodash'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  options2: any[] = []
  data: any[] = []
  tableData: any[] = []
  cols : any[] = [{field : 'label', header: 'Name'}]
  constructor(private service: AppService) {

  }
  ngOnInit() {
    forkJoin(this.service.getGoalMilestone(), this.service.listUsers())
      .subscribe((res: any) => {
        console.log(res)
        res[1].map((el: any) => {
          this.options2.push({ label: `${el.name} ${el.family_name}`, value: el.Username })
        })
        this.data = _.groupBy(res[0], 'stakeholder_name');
        Object.keys(this.data).map(el => {
          let temp: any[] = _.uniqBy(this.data[el], 'goal_id').map(el2 => { return { data: { label: el2.goal_name, owner: el2.goal_owner, createAt: el2.goal_date, goal_id: el2.goal_id, definition: el2.goal_definition }, children: this.data[el].filter(el3 => el3.goal_id == el2.goal_id).map(el4 => { return { data: { label: el4.milestone_name, owner: el4.milestone_owner, createAt: el4.milestone_date, milestone_id: el4.milestone_id, definition: el4.milestone_definition } } }) } })
          this.tableData.push(<TreeNode>{
            label: el, data: { label: el },
            children:
              temp
          })
        })
      }, 
      err => console.log(err))
  }
}
