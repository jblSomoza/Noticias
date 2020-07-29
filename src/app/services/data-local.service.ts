import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storege: Storage,
              private toast: ToastController) { 
    this.cargarFavorito();
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 1500
    });
    toast.present();
  }
  
  guardarNoticia(noticia: Article){
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if(!existe){
      this.noticias.unshift(noticia);
      this.storege.set('Favoritos', this.noticias);
    }
    this.presentToast("Agregado a favoritos");
  }

  async cargarFavorito(){
    const favoritos = await this.storege.get('Favoritos');
    if( favoritos){
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia: Article){
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title); //solo guarda el diferente
    this.storege.set('Favoritos', this.noticias);
    this.presentToast("Eliminado de favoritos");
  }
}
