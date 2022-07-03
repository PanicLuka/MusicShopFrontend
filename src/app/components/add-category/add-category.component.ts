import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  public category!: Category;
  public categoryName!: string;
  public categoryDescription!: string;

  ngOnInit(): void {
  }

  createCategory() {

    this.category = {
      categoryId: 0,
      categoryName: this.categoryName,
      categoryDescription: this.categoryDescription
    }

    this.categoryService.createCategory(this.category)
      .subscribe(res => {
        console.log();

      })

  }

}
