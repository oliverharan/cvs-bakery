import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';
// Angular Firestore
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Credits } from '../models/credits.model';
import { ReceipeCatalog } from '../models/receipeCatalog.model';
import { SideNav } from '../models/sidenav.model';
import { environment } from '../../../environments/environment';

const API = environment.api;
const RELAYDATA = '../../assets/data.json';


@Injectable({
  providedIn: 'root'
})
export class RelayService {
  recipesCollection: AngularFirestoreCollection<ReceipeCatalog>;
  creditsCollection: AngularFirestoreCollection<Credits>;
  recipeDoc: AngularFirestoreDocument<ReceipeCatalog>;
  recipes: Observable<any[]>;
  credits: Observable<any[]>;

  constructor(private http: HttpClient, public afs: AngularFirestore) {
    this.credits = this.afs.collection('credits').valueChanges();
    this.recipesCollection = this.afs.collection('recipeCatalog', ref => ref.orderBy('title', 'asc'));
    // this.recipes = this.afs.collection('recipeCatalog').valueChanges();
    this.recipes = this.afs.collection('recipeCatalog')
    .snapshotChanges()
    .pipe(map(changes => {
      return changes.map(items => {
        const data: any = items.payload.doc.data() as ReceipeCatalog;
        data.id = items.payload.doc.id;
        return data;
      });
    }));
   }
   addCategory(item: ReceipeCatalog) {
    //  console.log('serv', item);
    //  const id = this.afs.createId();
    //       this.recipesCollection.doc(id).set(item);
        this.recipesCollection.add(item);
  //   const subtitleId = this.afs.createId();
  //   const childrenId = this.afs.createId();
  //   const codeId = this.afs.createId();
  //   const id = this.afs.createId();
  //   // const item: Item = { id, name };
  //   console.log('my item', item);
  //   this.recipesCollection.doc(id).set({
  //     item: {
  //       'title': item.title,
  //     }
  // });
  //       this.recipesCollection.add(item).then(function(docRef) {
  //     console.log('Document written with ID: ', docRef.id);
  // });
//     this.recipesCollection.add(item)
//     .then(ref => {
//       ref.set({ id: ref.id }, { merge: true }).then(() => {
// console.log('Your extra id field has been created');
// });
// });
   }
  getCredits() {
    return this.credits;
        // Json-server connect
    // return this.http
    // .get(`${API}/credits`);
  }
  getSideNav() {
    return this.recipes;
        // Json-server connect
    // return this.http
    // .get(`${API}/receipeCatalog`);

  }
  getReceipeCatalog() {
    return this.recipes;
    // Json-server connect
    // return this.http
    // .get(`${API}/receipeCatalog`);
  }
  updateReceipCatalog(recipeCatalog: ReceipeCatalog) {
    this.recipeDoc = this.afs.doc(`recipeCatalog/${recipeCatalog.items[0].id}`);
    this.recipeDoc.update(recipeCatalog);
    // Json-server connect
    // console.log(receipe);
    // return this.http
    // .put(`${API}/receipeCatalog/${receipe.id}`, receipe);
  }
  removeItem(recipeCatalog: ReceipeCatalog) {
    this.recipeDoc = this.afs.doc(`recipeCatalog/${recipeCatalog.items[0].id}`);
    console.log('doc', this.recipeDoc);
    this.recipeDoc.delete();
  }

}

