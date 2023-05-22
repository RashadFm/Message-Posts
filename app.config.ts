import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppConfig } from './src/app/Models/IAppConfig.interface';


@Injectable()
export class AppConfig {
    static settings: IAppConfig;
    constructor(
        private http: HttpClient,
    ) { }
    load(): Promise<IAppConfig> {
        const jsonFile = `assets/config.json`;
        return new Promise<IAppConfig>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: any) => {
                AppConfig.settings = response as IAppConfig;
                resolve(response as IAppConfig);
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
