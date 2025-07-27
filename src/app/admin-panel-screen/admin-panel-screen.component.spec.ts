import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelScreenComponent } from './admin-panel-screen.component';

describe('AdminPanelScreenComponent', () => {
  let component: AdminPanelScreenComponent;
  let fixture: ComponentFixture<AdminPanelScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPanelScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPanelScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
