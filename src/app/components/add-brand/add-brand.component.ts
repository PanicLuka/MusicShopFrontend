import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  constructor(private brandsService: BrandsService) { }

  public brandName!: string;
  public brand!: Brand;

  ngOnInit(): void {

  }

  createBrand() {


    this.brand = {
      brandId: 0,
      brandName: this.brandName
    }

    this.brandsService.createBrand(this.brand)
      .subscribe(res => {
        console.log();
      })
  }



}
