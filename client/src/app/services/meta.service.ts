import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private meta: Meta) {}

  private setTitle(title: string) {
    this.meta.updateTag({ property: 'og:title', content: title });
  }

  private setType(type: string) {
    this.meta.updateTag({ property: 'og:type', content: type });
  }

  private setImage(imageSrc: string) {
    this.meta.updateTag({ property: 'og:image', content: imageSrc });
  }

  private setUrl(url: string) {
    this.meta.updateTag({ property: 'og:url', content: url });
  }

  private setDescription(description: string) {
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  private setCardType(cardType: string) {
    this.meta.updateTag({ name: 'twitter:card', content: cardType });
  }

  public updateMetaTags(metaTags: MetaTags) {
    const { title, type, imageSrc, url, description, cardType } = metaTags;

    this.setTitle(title);
    this.setType(type);
    this.setImage(imageSrc);
    this.setUrl(url);
    this.setDescription(description);
    this.setCardType(cardType);
  }
}

export interface MetaTags {
  title: string;
  type: string;
  imageSrc: string;
  url: string;
  description: string;
  cardType: string;
}
