import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questions } from '../model/Questions.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = 'https://opentdb.com/api.php?';


  constructor(private http:HttpClient) { }



  public getQuestions(option:string):Observable<Questions>{
    alert("url ="+this.baseUrl+option)
    return this.http.get<Questions>(this.baseUrl+option);
  }
}
