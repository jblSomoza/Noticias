import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = [];
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;

  constructor(private noticiasService: NoticiasService) {

  }

  ngOnInit(){
    this.cargarNoticias(); 
  }

  loadData(event){    
    console.log(event);
    this.cargarNoticias( event);
  }

  cargarNoticias( event? ){    
    this.noticiasService.getTopHeadLines()
      .subscribe(resp => {
        this.noticias.push( ...resp.articles );

        if(resp.articles.length === 0){
          event.target.disable = true;
          event.target.complete();
          return;
        }

        if(event){
          event.target.complete();
        }
      });
  }

}
