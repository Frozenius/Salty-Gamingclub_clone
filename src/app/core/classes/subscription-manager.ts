import { Subscription } from 'rxjs';

export class SubscriptionManager {
  private subList: Subscription[] = [];
  isLoading: boolean;
  timer$?: NodeJS.Timeout;

  constructor(private checkFrequency: number = 200, private defaultLoading = true) {
    this.isLoading = defaultLoading;
  }

  loadCheck(): boolean {
    let checkIsLoading = false;
    for (const index in this.subList) {
      if (!this.subList[index].closed) {
        checkIsLoading = true;
      }
    }

    if (checkIsLoading === true) {
      this.isLoading = true;
      return this.isLoading;
    } else {
      this.subList = [];
      this.isLoading = false;
      return false;
    }
  }

  addNewSubscription(newSub: Subscription) {
    this.subList.push(newSub);
    this.setTimeCheck();
  }

  setTimeCheck() {
    this.timer$ = setTimeout(() => {
      if (this.loadCheck()) {
        this.setTimeCheck();
      }
    }, this.checkFrequency);
  }

  unsubscribeAll() {
    this.subList.forEach((element) => {
      element.unsubscribe();
    });
  }
}
