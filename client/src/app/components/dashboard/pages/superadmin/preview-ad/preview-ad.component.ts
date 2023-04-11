import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaidAdsModel } from 'src/app/models/paid-ads-model';
import { PaymentAdsModel } from 'src/app/models/payment-ads-model';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-preview-ad',
  templateUrl: './preview-ad.component.html',
  styleUrls: ['./preview-ad.component.scss'],
})
export class PreviewAdComponent implements OnInit {
  public data: any;
  public additionalInformation!: PaidAdsModel;

  constructor(
    private router: ActivatedRoute,
    private service: CallApiService
  ) {}

  ngOnInit(): void {
    console.log(this.router.snapshot.params['id']);
    this.service
      .callGetMethod('/api/getRequestAdById', this.router.snapshot.params['id'])
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          const ad = data[0];
          this.data = ad;
          this.additionalInformation = {
            city: ad.city,
            position: ad.position,
            buyer: ad.firstname,
            start_date: ad.start_date,
            expired_date: ad.expired_date
          };
        }
      });
  }
}
