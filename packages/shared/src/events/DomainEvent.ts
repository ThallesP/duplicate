import type { UniqueEntityID } from "../entities/UniqueEntityId.ts";

export interface DomainEvent {
	ocurredAt: Date;
	getAggregateId(): UniqueEntityID;
}
