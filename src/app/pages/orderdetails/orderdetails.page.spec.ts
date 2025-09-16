import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderdetailsPage } from './orderdetails.page';

describe('OrderdetailsPage', () => {
  let component: OrderdetailsPage;
  let fixture: ComponentFixture<OrderdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
