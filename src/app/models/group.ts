export interface GroupOptions {
  name?: string;
  item?: string;
  showImages?: boolean;
  visibleIfSelected?: boolean;
  firstVariable?: string;
  secondVariable?: string;
  groupItems?: Array<any>;
}

export class Group {
  name = '';
  item = '';
  showImages = false;
  visibleIfSelected = false;
  firstVariable = '';
  secondVariable = '';
  groupItems = [];

  constructor(options?: GroupOptions) {
    for (const i in options) {
      if (options.hasOwnProperty(i)) {
        if (options[i]) {
          this[i] = options[i];
        }
      }
    }
  }
}
