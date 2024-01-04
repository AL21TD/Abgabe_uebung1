import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';
import { CHILDREN_PER_PAGE } from './constants';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient, private storeService: StoreService) {}

  public getKindergardens() {
    this.http
      .get<Kindergarden[]>('http://localhost:5000/kindergardens')
      .subscribe((data) => {
        this.storeService.kindergardens = data;
      });
  }
  public getKindergartenById(id: string): Observable<Kindergarden> {
    return this.http.get<Kindergarden>(
      `http://localhost:5000/kindergardens/${id}`
    );
  }
  public getAllKindergardens(): Observable<Kindergarden[]> {
    return this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens');
  }

  public getChildren(page: number) {
    this.http
      .get<ChildResponse[]>(
        `http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${CHILDREN_PER_PAGE}`,
        { observe: 'response' }
      )
      .subscribe((data) => {
        this.storeService.children = data.body!;
        this.storeService.childrenTotalCount = Number(
          data.headers.get('X-Total-Count')
        );
      });
  }

  public addChildData(child: Child, page: number, onSuccess: () => void) {
    this.http.post('http://localhost:5000/childs', child).subscribe((_) => {
      this.getChildren(page);
      onSuccess(); // Callback aufrufen
    });
  }

  public deleteChildData(childId: string, page: number): Observable<any> {
    return this.http.delete(`http://localhost:5000/childs/${childId}`).pipe(
      tap({
        next: (_) => {
          this.getChildren(page);
        },
        error: (error) => {
          console.error('Fehler beim Löschen des Kindes', error);
        },
      })
    );
  }

  public getChildrenByKindergarden(kindergardenId: number, page: number) {
    this.http
      .get<ChildResponse[]>(
        `http://localhost:5000/childs?_expand=kindergarden&kindergardenId=${kindergardenId}&_page=${page}&_limit=${CHILDREN_PER_PAGE}`,
        { observe: 'response' }
      )
      .subscribe(
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
