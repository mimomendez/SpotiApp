import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  // IMPORTANT: THIS TOKEN ONLY WORKS FOR AN HOUR. YOU SHOULD GET IT FROM SPOTIFY WEBSITE
  // POST - https://accounts.spotify.com/api/token => 
  // body = { grant_type: 'client_credentials', client_id: '*', client_secret: '*'}
  // * to complete from https://developer.spotify.com/dashboard/ with a logged user
  private token:string = 'Bearer BQDdE_bgf2qnaJSeJdAV7-BcL7QjMJLljdAUZO9ZmODQ1KKctQL3O4pFum_xMkzbnHVYeOCxOFAiF4oHpT0';

  constructor(private http:HttpClient) {
    console.log("Servicio listo...")
  }

  getQuery = (query: string) => {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.http.get(url, {headers})
  };

  getNewReleases = () => {
    return this.getQuery('browse/new-releases')
      .pipe( map( (data:any) => data['albums'].items));
  }

  getArtistas = (termino: string) => {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe( map( (data:any) => data['artists'].items));
  }

  getArtista = (id: string) => {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks = (id: string) => {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe( map( (data:any) => data['tracks']));
  }
}
