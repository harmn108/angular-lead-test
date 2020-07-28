import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Group } from './models/group';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public groupsList: Group[] = [];

  public displayedColumns: string[] = ['drag', 'default', 'image', 'name', 'price', 'inStock', 'subCategory'];

  constructor (
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.groupsList.push(
      new Group({name: 'Group 1', groupItems: [
          {default: true, image: '', name: 'aaa', price: '5$', inStock: false, subCategory: true},
          {default: false, image: '', name: 'bbb', price: '6$', inStock: true, subCategory: false},
          {default: true, image: '', name: 'ccc', price: '7$', inStock: false, subCategory: true},
        ], showImages: true}),
      new Group({name: 'Group 2', groupItems: [
          {default: false, image: '', name: 'Helium', price: '4.0026$', inStock: true, subCategory: false},
        ]}),
      new Group({name: 'Group 3', groupItems: [
          {default: false, image: '', name: 'Lithium', price: '6.941$', inStock: false, subCategory: true}
        ]})
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.groupsList, event.previousIndex, event.currentIndex);
  }

  dropTable(event: CdkDragDrop<any[]>, groupItems) {
    moveItemInArray(groupItems, event.previousIndex, event.currentIndex);
  }

  getTableData(data) {
    return new MatTableDataSource(data);
  }

  addNewGroup() {
    this.groupsList.push(new Group({name: `Group ${this.groupsList.length + 1}`}));
  }

  deleteGroup(index) {
    if (this.groupsList[index]) {
      this.groupsList.splice(index, 1);
    }
  }

  addNewTableItem(groupItems) {
    groupItems.push({default: true, image: '', name: 'nextImage', price: '1.0079$', inStock: true, subCategory: true});
    this.ref.detectChanges();
  }
}
