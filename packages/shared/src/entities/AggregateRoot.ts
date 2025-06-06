import { Entity } from "./Entity.ts";
import type { DomainEvent } from "../events/DomainEvent.ts";
import { DomainEvents } from "../events/DomainEvents.ts";

export abstract class AggregateRoot<Props> extends Entity<Props> {
	private _domainEvents: DomainEvent[] = [];

	get domainEvents(): DomainEvent[] {
		return this._domainEvents;
	}

	protected addDomainEvent(domainEvent: DomainEvent): void {
		this._domainEvents.push(domainEvent);
		DomainEvents.markAggregateForDispatch(this);
	}

	public clearEvents() {
		this._domainEvents = [];
	}
}
