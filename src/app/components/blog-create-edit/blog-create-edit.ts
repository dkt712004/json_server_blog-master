import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../service/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-create-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './blog-create-edit.html'
})
export class BlogCreateEdit implements OnInit {
  public productForm: FormGroup;
  public isEditMode = false;
  public currentCode: string = '';
  public selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    public router: Router // PHẢI LÀ PUBLIC để dùng được trong HTML
  ) {
    // Khởi tạo form
    this.productForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.currentCode = this.route.snapshot.params['code'];
    if (this.currentCode) {
      this.isEditMode = true;
      this.blogService.getDetail(this.currentCode).subscribe(data => {
        this.productForm.patchValue(data);
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    const rawValue = this.productForm.value;

    formData.append('code', rawValue.code);
    formData.append('name', rawValue.name);
    formData.append('price', rawValue.price.toString());
    formData.append('stock', rawValue.stock.toString());
    formData.append('newProduct', (!this.isEditMode).toString());

    if (this.selectedFile) {
      formData.append('fileData', this.selectedFile);
    }

    this.blogService.save(formData).subscribe({
      next: () => {
        alert('Lưu dữ liệu thành công!');
        this.router.navigate(['/blogs']);
      },
      error: (err) => alert('Lỗi kết nối Java: ' + err.message)
    });
  }
}
