import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(private http: HttpClient) {}

  getConfiguration(path: string, file: string) {
    return this.http.get('../../assets/configurations/' + path + '/' + file);
  }

  getLanguageForDashboard(language: string) {
    return this.http.get(
      '../../assets/configurations/languages/dashboard/' + language + '.json'
    );
  }

  getLanguage(language?: string) {
    return this.http.get(
      '../../assets/configurations/languages/germany.json'
    );
  }

  getAllLangs() {
    return this.http.get(
      '../../assets/configurations/languages/choose-lang.json'
    );
  }
}
