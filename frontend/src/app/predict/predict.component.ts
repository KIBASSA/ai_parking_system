import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ImageCarPredictorService} from './predict.service'
import {PredictedImage} from './predict.model'
import { Guid } from 'guid-typescript';
@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})

export class PredictComponent implements OnInit {

  uploadedImages:string[]=[]
  predictedImages:PredictedImage[]=[]

  constructor(private carTypePredictorAPI: ImageCarPredictorService,
              private router:Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {}

  onSuccess(data: any) {
    console.log(" data : " +  data[0])
    this.uploadedImages.push(data[0]["dataURL"])
  }

  reset()
  {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  submit()
  {
    var imagesToPredict = {}
    this.uploadedImages.forEach(a=>
      {
        imagesToPredict[Guid.create().toString()] = a;
      });

    this.carTypePredictorAPI.predictCarType(imagesToPredict).subscribe(res=>
      {
        let result = JSON.parse(res);
        for (let key in imagesToPredict) {
          for(var i = 0; i < result.length; i++) {
            var item = result[i];
            if (item.hasOwnProperty(key)) {
                console.log(item[key])
                this.predictedImages.push(new PredictedImage(key,imagesToPredict[key],item[key][0],item[key][1]))
            }
          }
        }
      });
  }

  onSendingmultiple(event:any) {

  }

  onError(event:any) {

  }
}
