import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {FirebaseDataService} from "./services/firebase-data";


let firebaseService = inject(FirebaseDataService)
export const authGuardGuard: CanActivateFn = (route, state) => {


  return firebaseService.user$ != null;
};
