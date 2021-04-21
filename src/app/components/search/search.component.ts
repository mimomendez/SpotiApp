import { SpotifyService } from './../../services/spotify.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent{

  artistas: any[] = [];
  loading: boolean = false;

  constructor(private spotify:SpotifyService) { }

  buscar = (termino: string) => {
    this.loading = true;
    if (termino == ''){
      this.loading = false;
      this.artistas = [];
    } else {
      this.spotify.getArtistas(termino)
        .subscribe( (data: any) => {
          this.artistas = data;
          this.loading = false;
        });
    };
  }
  
}
