import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.interface';

@Injectable({ providedIn: 'root' })
export class SaveService {

  private user: User;

  constructor(private auth: AuthService) {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  async save(slug: string): Promise<void> {
    this.user.saved.push(slug);
    await this.auth.updateUserDoc(this.user, {
      saved: this.user.saved,
      isPro: this.user.isPro,
    });
  }

  async unsave(slug: string): Promise<void> {
    const saved = this.user.saved.filter(s => s !== slug);
    await this.auth.updateUserDoc(this.user, {
      saved,
      isPro: this.user.isPro,
    });
  } 

  getSaveMessage(slug: string): string {
    if (this.user === undefined) {
      return 'login';
    }

    if (this.user && this.user.saved.includes(slug)) {
      return 'save';
    }
    
    if (this.user && !this.user.saved.includes(slug)) {
      return 'unsave';
    }

    return '';
  }

}
