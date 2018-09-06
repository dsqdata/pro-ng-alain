import {TestBed, TestModuleMetadata} from '@angular/core/testing';
import {setUpTestBed} from '@testing/common.spec';
import {SelectCommunityComponent} from "./select-community.component";


describe('Pages: lock', () => {
  setUpTestBed(<TestModuleMetadata>{
    declarations: [SelectCommunityComponent],
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(SelectCommunityComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});
