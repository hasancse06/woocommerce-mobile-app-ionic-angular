import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdersuccessPage } from './ordersuccess.page';

describe('OrdersuccessPage', () => {
  let component: OrdersuccessPage;
  let fixture: ComponentFixture<OrdersuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
