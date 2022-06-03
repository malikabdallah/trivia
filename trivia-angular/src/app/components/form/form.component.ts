import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;


  constructor( private formBuilder: FormBuilder,private service:QuestionService,
    private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      trivia_amount: '10',
      trivia_category: ['any'],
      trivia_difficulty:['any'],
      trivia_type: ['any']
    });



  }


  public submit(){
    let s:string="";
    s="amount="+this.form.value["trivia_amount"];
    
    
    if(this.form.value["trivia_category"]!="any"){
      s=s+"&category="+(this.form.value["trivia_category"])
    }

    if(this.form.value["trivia_difficulty"]!="any"){
      s=s+"&difficulty="+(this.form.value["trivia_difficulty"])
    }

    if(this.form.value["trivia_type"]!="any"){
      s=s+"&type="+(this.form.value["trivia_type"])
    }


    this.service.getQuestions(s).subscribe(
      data=>{
        console.log("data="+data);
        localStorage.setItem("questions",JSON.stringify(data));
      }
    )

    this.router.navigate(["game"]);
    
    
  
  }
}
