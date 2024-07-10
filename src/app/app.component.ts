import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { MusicaService } from './services/musica.service';
import { Musica } from './models/musica.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule],
  templateUrl:   './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'prj_angular';

  //criando um Observable para o array Musica[]
  musicas$ = new Observable<Musica[]>()

  //form
  id ='';
  titulo='';
  artista='';
  album='';
  ano='';
  genero='';

  constructor(private musicaService: MusicaService){
    this.getMusicasCadatradas()
  }
  //método para gerar os dados/musicas que estão na "API"
  getMusicasCadatradas(){
  
    this.musicas$ = this.musicaService.getMusica();
  }
  //método para incluir um dado/musica na "API"
    cadastrarMusica(){

      //verificação simples para que esteja preenchido os inputs
      if(!this.titulo || !this.artista)
        return;
      if (this.id){
        this.atualizar();
       return;
      }
      
      //continuação do método para incluir o dado/musica
      this.musicaService.cadastrarMusica({
        artista: this.artista,
        titulo: this.titulo,
        album: this.album,
        ano: this.ano,
        genero: this.genero,
      }).subscribe(()=> this.getMusicasCadatradas())
      
    }
    //fim do método de inclusão

    //método para fazer a atulização de dados/musica 
    atualizar(){
      this.musicaService.editarMusica({ 
        id: parseInt(this.id),
        artista : this.artista,
        titulo : this.titulo,
        genero : this.genero,
        ano : this.ano,
        album : this.album,
      }).subscribe(() => this.getMusicasCadatradas());
    }

    //método para editar um dado/musica a partir do input
    preencherCampos(musica:Musica){
      this.id = musica.id!.toString();
      this.artista = musica.artista;
      this.titulo = musica.titulo;
      this.genero = musica.genero;
      this.ano = musica.ano;
      this.album = musica.album;
    }


    //método para remover um dado/musica a partir do input
    remover(id: number){
      return this.musicaService.remover(id).subscribe(() => this.getMusicasCadatradas());
    }
}
