import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { docData, Firestore, setDoc } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, GoogleAuthProvider, User as FirebaseUser } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { LoginData, SignUpData, User, UserData } from './user';

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
    // await this.router.navigateByUrl('/profile');
  }

  async loginWithGoogle(): Promise<void> {
    const credentials = await signInWithPopup(
      this.auth, 
      new GoogleAuthProvider()
    );

    await this.updateUserDoc(credentials.user);
    // await this.router.navigateByUrl('/profile');
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
    // await this.router.navigateByUrl('/');
  }

  async updateUserDoc(user: User | FirebaseUser, data?: UserData): Promise<void> {
    const payload: User = {
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			uid: user.uid,
      isPro: false,
      saved: [],
    }

    if (data && data.saved) payload.saved = data.saved;
    
    await setDoc(
      doc(this.firestore, `users/${user.uid}`), 
      { ...payload }, 
      { merge: true },
    );
  }

  async logout(): Promise<void> {
    await signOut(this.auth);    
    // await this.router.navigateByUrl('/');
  }

}
