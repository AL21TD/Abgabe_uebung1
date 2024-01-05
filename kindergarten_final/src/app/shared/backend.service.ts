import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Kindergarden } from './interfaces/Kindergarden';
import { Child, ChildResponse } from './interfaces/Child';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient, private storeService: StoreService) {}

  getKindergardens() {
    this.http
      .get<Kindergarden[]>('http://localhost:5000/kindergardens')
      .subscribe((data) => {
        this.storeService.kindergardens = data;
      });
  }

  getAllKindergardens(): Observable<Kindergarden[]> {
    return this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens');
  }

  getChildren(page: number, pageSize: number, sort: string = '') {
    let url = `http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${pageSize}`;
    if (sort) {
      url += `&_sort=${sort}`;
    }
    this.http
      .get<ChildResponse[]>(url, { observe: 'response' })
      .subscribe((data) => {
        this.storeService.children = data.body!;
        this.storeService.childrenTotalCount = Number(
          data.headers.get('X-Total-Count')
        );
      });
  }

  deleteChildData(
    childId: string,
    page: number,
    pageSize: number
  ): Observable<any> {
    return this.http.delete(`http://localhost:5000/childs/${childId}`).pipe(
      tap({
        next: (_) => {
          this.getChildren(page, pageSize);
        },
        error: (error) => {
          console.error('Fehler beim Löschen des Kindes', error);
        },
      })
    );
  }
  getKindergartenById(id: string): Observable<Kindergarden> {
    return this.http.get<Kindergarden>(
      `http://localhost:5000/kindergardens/${id}`
    );
  }

  addChildData(child: Child, page: number, pageSize: number): Observable<any> {
    return this.http.post('http://localhost:5000/childs', child).pipe(
      tap({
        next: (_) => {
          this.getChildren(page, pageSize);
        },
        error: (error) => {
          console.error('Fehler beim Hinzufügen des Kindes', error);
        },
      })
    );
  }

  getChildrenByKindergarden(
    kindergardenId: number,
    page: number,
    pageSize: number
  ) {
    let url = `http://localhost:5000/childs?_expand=kindergarden&kindergardenId=${kindergardenId}&_page=${page}&_limit=${pageSize}`;
    this.http.get<ChildResponse[]>(url, { observe: 'response' }).subscribe(
      (response) => {
        this.storeService.children = response.body!;
        this.storeService.childrenTotalCount = Number(
          response.headers.get('X-Total-Count')
        );
      },
      (error) => {
        console.error('API error: ', error);
      }
    );
  }
}
