/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PocketBTestModule } from '../../../test.module';
import { CapacityDetailsDialogComponent } from '../../../../../../main/webapp/app/entities/capacity-details/capacity-details-dialog.component';
import { CapacityDetailsService } from '../../../../../../main/webapp/app/entities/capacity-details/capacity-details.service';
import { CapacityDetails } from '../../../../../../main/webapp/app/entities/capacity-details/capacity-details.model';
import { RetreatCapacityService } from '../../../../../../main/webapp/app/entities/retreat-capacity';

describe('Component Tests', () => {

    describe('CapacityDetails Management Dialog Component', () => {
        let comp: CapacityDetailsDialogComponent;
        let fixture: ComponentFixture<CapacityDetailsDialogComponent>;
        let service: CapacityDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [CapacityDetailsDialogComponent],
                providers: [
                    RetreatCapacityService,
                    CapacityDetailsService
                ]
            })
            .overrideTemplate(CapacityDetailsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CapacityDetailsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CapacityDetailsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CapacityDetails(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.capacityDetails = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'capacityDetailsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CapacityDetails();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.capacityDetails = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'capacityDetailsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
