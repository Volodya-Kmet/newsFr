import {Component, ViewChild} from '@angular/core';
import {NewsService} from "../../services/NewsService";
import * as moment from 'moment'
import {Storage} from "@ionic/storage";
import {AlertController, Content} from "ionic-angular";


@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  @ViewChild(Content) content: Content;

  public title: string = "Top";
  public news: any = [];


  constructor(private newsService: NewsService, private storage: Storage, public alertCtrl: AlertController) {
    this.selectNews(this.title, null)
  }

  selectNews(title, sours) {
    this.storage.get('token')
      .then((token) => {
        this.newsService.getNews(token, title, sours)
          .subscribe(
            (response) => {
              response.articles.forEach(art => {
                art.publishedAt = moment(art.publishedAt).fromNow();
                this.content.scrollToTop();
              });
              this.news = response.articles;
            },
            (err) => {
              this.showAlert(err.statusText, err._body)
            }
          );
      })
  }

  showAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  doRefresh(refresher) {
    this.selectNews(this.title, null)

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
