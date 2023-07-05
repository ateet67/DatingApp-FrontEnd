import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Output, EventEmitter, Input } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';


@Component({
  selector: 'app-app-auto-complete',
  templateUrl: './app-auto-complete.component.html',
  styleUrls: ['./app-auto-complete.component.scss']
})
export class AppAutoCompleteComponent implements OnInit {

  @Input() allItems: any;
  @Input() placeHolder: string = '';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() label: string = '';
  @Input() values: number[] = [];
  selectedChips: any = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl: FormControl = new FormControl('');
  filteredItems: any;
  @Output() valuesChange = new EventEmitter<number[]>();

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredItems = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => (item ? this._filter(item) : this.allItems.slice())),
    );
  }

  ngOnInit(): void {
    this.selectedChips = this.allItems.filter((e: any) => this.values.includes(e.id));
  }

  add(event: any): void {
    const value = parseInt(event.value);
    if (value) {
      this.selectedChips.push(value);
    }
    event.chipInput!.clear();
    this.fruitCtrl.setValue(null);
  }

  remove(item: any): void {
    const index = this.selectedChips.indexOf(item);
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
      this.announcer.announce(`Removed ${item.name}`);
    }
    this.values = this.selectedChips.map((e: any) => e.id);
    this.valuesChange.emit(this.values);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruitInput.nativeElement.value = '';
    this.selectedChips = [...this.selectedChips, event.option.value].filter((e, i, a) => a.indexOf(e) == i);
    this.values = this.selectedChips.map((e: any) => e.id);
    this.valuesChange.emit(this.values);
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.allItems.filter((item: any) => item.name.toLowerCase().includes(filterValue));
  }
}
