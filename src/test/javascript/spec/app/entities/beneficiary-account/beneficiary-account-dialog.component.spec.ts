/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PocketBTestModule } from '../../../test.module';
import { BeneficiaryAccountDialogComponent } from '../../../../../../main/webapp/app/entities/beneficiary-account/beneficiary-account-dialog.component';
import { BeneficiaryAccountService } from '../../../../../../main/webapp/app/entities/beneficiary-account/beneficiary-account.service';
import { BeneficiaryAccount } from '../../../../../../main/webapp/app/entities/beneficiary-account/beneficiary-account.model';
import { ClientAccountService } from '../../../../../../main/webapp/app/entities/client-account';

describe('Component Tests', () => {

    describe('BeneficiaryAccount Management Dialog Component', () => {
        let comp: BeneficiaryAccountDialogComponent;
        let fixture: ComponentFixture<BeneficiaryAccountDialogComponent>;
        let service: BeneficiaryAccountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PocketBTestModule],
                declarations: [BeneficiaryAccountDialogComponent],
                providers: [
                    ClientAccountService,
                    BeneficiaryAccountService
                ]
            })
            .overrideTemplate(BeneficiaryAccountDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BeneficiaryAccountDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BeneficiaryAccountService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BeneficiaryAccount(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.beneficiaryAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'beneficiaryAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BeneficiaryAccount();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.beneficiaryAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'beneficiaryAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
