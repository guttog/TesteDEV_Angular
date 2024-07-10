import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Musica } from "../models/musica.model";

@Injectable({
    providedIn: 'root',
})
export class MusicaService{

    //pegando o endpoint da "API"
    private url: string = `${environment.api}musicas`;

    //constructor para usar os métodos HTTP do Angular
    constructor(private http:HttpClient){
    }

    //método para pegar todos os dados/musicas da "API"
    getMusica(){
        return this.http.get<Musica[]>(this.url);
    }

    //método para cadastrar/adicionar um novo dado/musica na "API"
    cadastrarMusica(musica:Musica){
        return this.http.post<Musica>(this.url, musica);

    }
    //método para editar algum dado/musica da "API" usando id
    editarMusica(musica:Musica){
        return this.http.put<Musica>(`${this.url}/${musica.id}`,musica);
    }

    //método para remover um dado/musica da "API" pelo id
    remover(id: number){
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}
    