import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-blog-create-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blog-create-edit.html',
  styleUrl: './blog-create-edit.css'
})
export class BlogCreateEditComponent implements OnInit {
  blogForm!: FormGroup;
  isEditMode = false;
  blogId!: number;
  positionsData = [
    { id: 1, name: 'Việt Nam' }, { id: 2, name: 'Châu Á' },
    { id: 3, name: 'Châu Âu' }, { id: 4, name: 'Châu Mỹ' }
  ];

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      des: ['', Validators.required],
      detail: ['', Validators.required],
      category: [0],
      public: [false],
      data_pubblic: ['', Validators.required],
      position: this.fb.array([]) // tạo bảng rỗng để ghi nhớ các id pos khi user chọn
    });

    this.blogId = this.route.snapshot.params['id']; // lấy id trên thanh đchi trình duyệt
    if (this.blogId) {
      this.isEditMode = true;
      this.blogService.getDetail(this.blogId).subscribe((res: any) => {
        this.blogForm.patchValue(res);
        const posArray = this.blogForm.get('position') as FormArray;
        res.position?.forEach((pId: number) => {
          posArray.push(new FormControl(pId));
        });
      });
    }
  }

  isPosChecked(id: number): boolean {
    const values = this.blogForm.get('position')?.value;
    return Array.isArray(values) && values.includes(id);
  }
  // id: number: Đây là tham số truyền vào, đại diện cho ID của vị trí (ví dụ: 1 cho Việt Nam, 2 cho Châu Á). Khi bạn dùng @for ở HTML, mỗi vòng lặp sẽ truyền một ID khác nhau vào hàm này.
  // this.blogForm.get('position')?.value:
  //   Hàm này truy cập vào FormArray có tên là position.
  // Dấu ?. (Optional Chaining) giúp code không bị sập nếu chẳng may position chưa được khởi tạo.
  // Kết quả trả về thường là một mảng số, ví dụ: [1, 3].
  // Array.isArray(values): Đảm bảo rằng dữ liệu chúng ta đang cầm trên tay thực sự là một danh sách (mảng), tránh lỗi nếu dữ liệu bị rỗng hoặc sai kiểu.
  // values.includes(id): Đây là hàm kiểm tra sự tồn tại. Nó hỏi rằng: "Trong danh sách [1, 3] này, có ông nào tên là 'id' không?".
  // Nếu có: Trả về true -> Ô checkbox sẽ có dấu tích.
  // Nếu không: Trả về false -> Ô checkbox để trống.

  onCheckboxChange(e: any) {
    const posArray: FormArray = this.blogForm.get('position') as FormArray;
    if (e.target.checked) {
      posArray.push(new FormControl(Number(e.target.value)));
    } else {
      let i: number = 0;
      posArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          posArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit() {
    if (this.blogForm.invalid) return;
    const data = this.blogForm.value;
    if (this.isEditMode) {
      this.blogService.update(this.blogId, data).subscribe(() => {
        this.router.navigate(['/blogs']);
      });
    } else {
      this.blogService.create(data).subscribe(() => {
        this.router.navigate(['/blogs']);
      });
    }
  }
}
