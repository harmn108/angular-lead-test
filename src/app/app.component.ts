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
    this.initDefaultData();
  }

  initDefaultData() {
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

  // Group Block Actions
  addNewGroup() {
    this.groupsList.push(new Group({name: `Group ${this.groupsList.length + 1}`}));
  }

  deleteGroup(index) {
    if (this.groupsList[index]) {
      this.groupsList.splice(index, 1);
    }
  }

  dropGroup(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.groupsList, event.previousIndex, event.currentIndex);
  }

  // Group Table Actions
  getTableData(data) {
    return new MatTableDataSource(data);
  }

  addNewTableItem(groupItems) {
    groupItems.push({default: true, image: '', name: 'nextImage', price: '1.0079$', inStock: true, subCategory: true});
    this.ref.detectChanges();
  }

  dropTable(event: CdkDragDrop<any[]>, groupItems) {
    moveItemInArray(groupItems, event.previousIndex, event.currentIndex);
  }
}
