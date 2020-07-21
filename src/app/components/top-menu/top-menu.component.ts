import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatabaseService, Source } from '../../services/database.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSelectSource: EventEmitter<string> = new EventEmitter<string>();
  sources: Source[];
  searchValue = '';
  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.fetchSources();
  }
  fetchSources(): void {
    this.db.fetchSources('sources').subscribe((sources) => {
      this.sources = [...sources, { source: 'all sources' }];
    });
  }

  filterPosts(): void {
    this.onFilter.emit(this.searchValue);
  }

  selectHandler(e): void {
    this.onSelectSource.emit(e.target.textContent.trim().toLowerCase());
  }
}
