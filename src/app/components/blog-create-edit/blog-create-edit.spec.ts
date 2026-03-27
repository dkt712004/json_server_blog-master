import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreateEdit } from './blog-create-edit';

describe('BlogCreateEdit', () => {
  let component: BlogCreateEdit;
  let fixture: ComponentFixture<BlogCreateEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCreateEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogCreateEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
