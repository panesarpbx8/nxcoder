import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { docData, Firestore, setDoc, doc } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, GoogleAuthProvider, User as FirebaseUser } from 'firebase/auth';
import { firstValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { LoginData, SignUpData, User, UserData } from './user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<User>;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
  ) {
    this.user$ = authState(auth).pipe(
      switchMap(user => {
        if (user) {
          return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
            map((data: UserData) => ({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              saved: data.saved,
              isPro: data.isPro,
            })),
          );
        } else {
          return of(null);
        }
      }),
    );
  }

  async createAccount(data: SignUpData): Promise<void> {
    if (!data.displayName || !data.email || !data.password) {
      throw Error('Insufficient information');
    } 
    
    const credentials = await createUserWithEmailAndPassword(
      this.auth, 
      data.email, 
      data.password
    );

    await updateProfile(credentials.user, { displayName: data.displayName });
    await this.updateUserDoc(credentials.user);
    location.pathname = '/dashboard';
  }

  async loginWithGoogle(): Promise<void> {
    const credentials = await signInWithPopup(
      this.auth, 
      new GoogleAuthProvider()
    );

    const exists = firstValueFrom(
      docData(doc(this.firestore, `users/${credentials.user.uid}`))
    );

    if (!exists) {
      await this.updateUserDoc(credentials.user);
    }

    history.back();
  }

  async login(data: LoginData): Promise<void> {
    if (!data.email || !data.password) {
      throw Error('Invalid credentials');
    }
    await signInWithEmailAndPassword(
      this.auth, 
      data.email, 
      data.password
    );

    history.back();
  }

  async updateUserDoc(user: User | FirebaseUser, data?: UserData): Promise<void> {
    console.log('DATA', data);
    console.log('USER', user);
    
    const payload: User = {
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			uid: user.uid,
      isPro: false,
      saved: [],
    }

    if (data && data.saved) payload.saved = data.saved;

    console.log(payload);
    
    
    await setDoc(
      doc(this.firestore, `users/${user.uid}`), 
      payload, 
      { merge: true }
    );
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    location.pathname = '/';
  }

}
