import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Iposts } from '../../models/iposts.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient =inject(HttpClient)

  // داخل PostsService
allPosts: WritableSignal<Iposts[]> = signal([]);

  myHeaders:object={
    headers:{
      'AUTHORIZATION': `Bearer ${localStorage.getItem('socialToken')}`
    }
  }

  getAllPosta():Observable<any>{
    return this.httpClient.get(`${environment.BaseUrl}/posts`, this.myHeaders)
  }
  createPost(body:any):Observable<any>{
    return this.httpClient.post(`${environment.BaseUrl}/posts`,body,this.myHeaders)
  }
  getSinglePost(postId:any):Observable<any>{
    return this.httpClient.get(`${environment.BaseUrl}/posts/${postId}`,this.myHeaders)
  }
  deletePost(postId:any):Observable<any>{
    return this.httpClient.delete(`${environment.BaseUrl}/posts/${postId}`,this.myHeaders)
  }
  getPostComments(postId:any):Observable<any>{
    return this.httpClient.get(`${environment.BaseUrl}/posts/${postId}/comments?page=1&limit=10`,this.myHeaders)
  }
  createComment( postId:any , body:any ):Observable<any>{
    return this.httpClient.post(`${environment.BaseUrl}/posts/${postId}/comments`,body,this.myHeaders)
  }
  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.httpClient.delete(`${environment.BaseUrl}/posts/${postId}/comments/${commentId}`,this.myHeaders);
  }
}
