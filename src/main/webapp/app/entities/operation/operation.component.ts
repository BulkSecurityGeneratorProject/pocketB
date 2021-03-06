import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Operation } from './operation.model';
import { OperationService } from './operation.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-operation',
    templateUrl: './operation.component.html'
})
export class OperationComponent implements OnInit, OnDestroy {
operations: Operation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private operationService: OperationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.operationService.query().subscribe(
            (res: HttpResponse<Operation[]>) => {
                this.operations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOperations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Operation) {
        return item.id;
    }
    registerChangeInOperations() {
        this.eventSubscriber = this.eventManager.subscribe('operationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
