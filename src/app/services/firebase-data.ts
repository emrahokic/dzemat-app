import { doc, docData, DocumentReference, Firestore, getDoc, setDoc, updateDoc, collection, addDoc, deleteDoc, collectionData, Timestamp } from  "@angular/fire/firestore";
import {inject, Injectable} from "@angular/core";
import {Auth, authState} from "@angular/fire/auth";
import {filter, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Schedule} from "./models/Schedule";

@Injectable({providedIn: 'root'})
export  class  FirebaseDataService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  user$ = authState(this.auth)
    .pipe(filter(user  =>  user !== null),
      map(user  =>  user!));
  router: Router = inject(Router);

  getDocData(path: string) {
    return  docData(doc(this.firestore, path), {idField:  'id'}) as  Observable<any>
  }

  getCollectionData<T>(path: string): Observable<T[]> {
    return  collectionData(collection(this.firestore, path), {idField:  'id'}) as  Observable<T[]>
  }

  async  SetConfig(data: Partial<any>) {
    await  updateDoc(doc(this.firestore, "config/default"), data)
  }
  async  SetSchedule(data: Partial<any>, id: string) {
    await  updateDoc(doc(this.firestore, "schedules/"+id), data)
  }
  async  AddSchedule(data: Partial<Schedule>) {
    const  ref = await  addDoc(collection(this.firestore, `schedules`), data)
    return setDoc(ref, {...data, id:  ref.id})
  }
  async  deleteSchedule(id:string) {
    const  ref = doc(this.firestore, 'schedules/'+id);
    await  deleteDoc(ref)
  }
}
