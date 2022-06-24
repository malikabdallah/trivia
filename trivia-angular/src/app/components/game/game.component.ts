import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import arrayShuffle from 'array-shuffle';
import { Question, Questions } from 'src/app/model/Questions.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {


  public nbQuestion:number=0;
  public question:Question;
  public cpt=0;
  public questions:Questions;
  public responsePossible:string[]=[];
  public nbRightResponse=0;
  public displayResult=false;
  public score:number;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.questions=JSON.parse(localStorage.getItem('questions')!);
    this.nbQuestion=this.questions.results.length;
    this.question=this.questions.results[this.cpt];
    for(let i=0;i<this.question.incorrect_answers.length;i++){
      
      this.responsePossible.push(this.question.incorrect_answers[i]);
    }
    this.responsePossible.push(this.question.correct_answer);


   this.responsePossible= arrayShuffle(this.responsePossible);
  }

  onClick(answer: string) {
    if(answer == this.question.correct_answer){
      this.nbRightResponse++;
    }

    this.cpt++;
    if(this.cpt!=this.nbQuestion){
        this.question=this.questions.results[this.cpt];
        this.responsePossible=[];
        for(let i=0;i<this.question.incorrect_answers.length;i++){
          
          this.responsePossible.push(this.question.incorrect_answers[i]);
        }
        this.responsePossible.push(this.question.correct_answer);


      this.responsePossible= arrayShuffle(this.responsePossible);

    }else{
      this.cpt--;
      this.displayResult=true;
      
      this.score=(this.nbRightResponse/this.nbQuestion)*100;
      localStorage.clear();


    }
  } 


  replay(){
    this.router.navigate([""]);
  } 
}
