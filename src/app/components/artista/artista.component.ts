import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent{

  artista:any = {};
  topTracks: any[] = [];
  loading: boolean = false;

  constructor(private router:ActivatedRoute, private spotify:SpotifyService) {
    this.router.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    })
  }

  getArtista = (id:string) => {
    this.loading = true;
    this.spotify.getArtista(id)
      .subscribe(artista => {
        this.artista = artista;
        this.loading = false;
      });
  };

  getTopTracks = (id:string) => {
    this.spotify.getTopTracks(id)
      .subscribe(topTracks => {
        this.topTracks = topTracks;
      });
  }

}
